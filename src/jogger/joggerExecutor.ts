import {getConnection} from "../connection/connection";
import {reaction} from "mobx";
import {Jogger} from "./jogger";
import fetchControls from "../gamepad/fetchControls";
type Timeout = NodeJS.Timeout;

const JOG_CANCEL = String.fromCharCode(0x85);

export class JoggerExecutor {
    private state: Jogger;
    private isStopped: boolean = true;
    private fetchInterval?: Timeout;

    constructor(state: Jogger) {
        this.state = state;
        reaction(() => state.enabled, () => state.enabled ? this.on() : this.off());
    }

    on() {
        console.log('jogger on')
        getConnection()?.on(this.onOk);
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

        const {x, y, z} = fetchControls();
        const squaredMagnitude = x * x + y * y + z * z;
        if(squaredMagnitude === 0) {
            this.stop();
        }else{
            getConnection()?.sendGcode(`$J=G91 X${x} Y${y} Z${z} F${Math.sqrt(squaredMagnitude) * 1000}`);
            this.isStopped = false;
            this.stopIdleFetch();
        }
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
