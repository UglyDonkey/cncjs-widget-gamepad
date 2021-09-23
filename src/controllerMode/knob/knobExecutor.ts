import {Knob} from "./knob";
import {reaction} from "mobx";
import fetchAngles from "../../gamepad/fetchAngles";
import {getConnection} from "../../connection/connection";
type Timeout = NodeJS.Timeout;
const {PI, abs, max} = Math;

const JOG_CANCEL = String.fromCharCode(0x85);

export class KnobExecutor {
    private state: Knob;
    private fetchInterval?: Timeout;
    private lastAngles: (number | undefined)[] = [undefined, undefined];
    private isStopped: boolean = true;
    private lastOk: boolean = true;

    constructor(state: Knob) {
        this.state = state;
        reaction(() => state.enabled, () => state.enabled ? this.on() : this.off());
    }

    private on() {
        this.startIdleFetch()
        getConnection()?.on(this.onOk);
    }

    private off() {
        this.stopIdleFetch();
        getConnection()?.off(this.onOk);
    }

    private onOk = (message: string) => {
        if(message === 'ok') {
            this.lastOk = true;
        }
    }

    private startIdleFetch() {
        if(!this.fetchInterval) {
            this.fetchInterval = setInterval(this.fetch, 100);
        }
    }

    private stopIdleFetch() {
        if(this.fetchInterval) {
            clearInterval(this.fetchInterval);
            this.fetchInterval = undefined;
        }
    }

    private fetch = () => {
        const angles = fetchAngles();

        if (this.state.enabled && this.lastOk) {
            const deltas = angles
                .map((value, index) => this.toDelta(value, this.lastAngles[index]))
                .map(value => value && value * this.state.sensitivity);

            if (deltas.find(a => a !== undefined)) {
                const [x, y] = this.normalize(deltas);
                this.jog({x, y, f: 9999});
            } else {
                this.stop();
            }
        }

        this.lastAngles = angles;
    }

    private normalize(values: (number|undefined)[]) {
        const normalizer = values.map(a => a || 0).map(abs).reduce((a, b) => max(a, b), 0);
        if(normalizer < 1) {
            return values;
        }
        return values.map(a => a !== undefined ? a / normalizer : undefined)
    }

    private jog(params: {[key: string]: (number | undefined)}) {
        const payload = Object.entries(params)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => `${key.toUpperCase()}${value!.toFixed(4)}`)
            .join(' ');

        getConnection()?.sendGcode(`$J=G91 ${payload}`);
        this.lastOk = false;
        this.isStopped = false;
    }

    private toDelta(angle?: number, lastAngle?: number) {
        if(angle === undefined || lastAngle === undefined) {
            return undefined
        }

        const cwDelta = angle - lastAngle;
        const ccwDelta = (cwDelta > 0 ? -2*PI + cwDelta : 2*PI + cwDelta);

        return abs(cwDelta) < abs(ccwDelta) ? cwDelta : ccwDelta;
    }

    private stop() {
        if(this.isStopped) {
            return;
        }
        getConnection()?.sendGcode(JOG_CANCEL);
        this.isStopped = true;
    }
}
