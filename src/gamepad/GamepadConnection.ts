import {makeAutoObservable} from "mobx";
import {Gamepad} from "./Gamepad";

export class GamepadConnection {
    selected?: Gamepad = undefined;
    available: Gamepad[] = [];
    deadzone: number = 0.15;

    constructor() {
        makeAutoObservable(this);
    }

    connected(gamepad: Gamepad) {
        const i = this.available.findIndex(a => a.index === gamepad.index);
        if(i === -1) {
            this.available.push(gamepad);
        } else {
            this.available[i] = gamepad;
        }
    }

    disconnected(gamepad: Gamepad) {
        const i = this.available.findIndex(a => a.index === gamepad.index);
        if(i !== -1) {
            this.available.splice(i, 1);
        }
        if(this.selected?.index === gamepad.index) {
            this.selected = undefined;
        }
    }

    select(gamepad: Gamepad) {
        if(this.available.filter(a => a.index === gamepad.index).length === 0) {
            return;
        }
        this.selected = gamepad;
    }

    get normalize() {
        return 1 / (1 - this.deadzone);
    }

    setDeadzone(deadzone: number) {
        this.deadzone = deadzone;
    }
}

const gamepadConnection = new GamepadConnection();

export default gamepadConnection;
