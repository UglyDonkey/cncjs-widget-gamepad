import {makeAutoObservable} from "mobx";

export class Knob {
    enabled: boolean = false;
    sensitivity: number = 1;

    constructor() {
        makeAutoObservable(this);
    }

    toggle() {
        this.enabled = !this.enabled;
    }

    off() {
        this.enabled = false;
    }

    setSensitivity(sensitivity: number) {
        this.sensitivity = sensitivity;
    }
}
