import {getConnection} from "../connection/connection";
import {reaction} from "mobx";
import {Jogger} from "./jogger";
import fetchControls from "../gamepad/fetchControls";
import jogger from "./index";
type Timeout = NodeJS.Timeout;

const JOG_CANCEL = String.fromCharCode(0x85);

export class JoggerExecutor {
    private state: Jogger;
    private isStopped: boolean = true;
    private fetchInterval?: Timeout;
    private lastFetch: number = 0;

    constructor(state: Jogger) {
        this.state = state;
        reaction(() => state.enabled, () => state.enabled ? this.on() : this.off());
    }

    on() {
        console.log('jogger on')
        getConnection()?.on(this.onOk);
        this.lastFetch = new Date().getTime();
        this.startIdleFetch();
    }

    off() {
        console.log('jogger off')
        this.stop();
        getConnection()?.off(this.onOk);
        this.stopIdleFetch();
    }

    private onOk = (message: string) => {
        if(message === 'ok' && this.state.enabled) {
            this.fetch();
        }
    }

    private fetch = () => {
        if(!this.state.enabled) {
            return;
        }

        const dt = Math.min(this.getDt(), 15);

        const {x, y, z} = fetchControls();
        const squaredMagnitude = x * x + y * y + z * z;
        if(squaredMagnitude === 0) {
            this.stop();
        }else{
            const f = Math.sqrt(squaredMagnitude) * jogger.maxFeedRate;
            const multiplier = 0.001 * f * dt;
            console.log({x, f, dt, multiplier})
            this.jog({
                x: x * multiplier,
                y: y * multiplier,
                z: z * multiplier,
                f
            });
            this.isStopped = false;
            this.stopIdleFetch();
        }
    }

    private getDt() {
        const time = new Date().getTime();
        const dt = time - this.lastFetch;
        this.lastFetch = time;
        return dt;
    }

    private jog(params: {[key: string]: number}) {
        const payload = Object.entries(params)
            .map(([key, value]) => `${key.toUpperCase()}${value.toFixed(4)}`)
            .join(' ');

        getConnection()?.sendGcode(`$J=G91 ${payload}`);
    }

    private stop() {
        if(this.isStopped) {
            return;
        }
        getConnection()?.sendGcode(JOG_CANCEL);
        this.isStopped = true;
        this.startIdleFetch();
    }

    private startIdleFetch() {
        if(!this.fetchInterval) {
            this.fetchInterval = setInterval(this.fetch, 20);
        }
    }

    private stopIdleFetch() {
        if(this.fetchInterval) {
            clearInterval(this.fetchInterval);
            this.fetchInterval = undefined;
        }
    }
}
