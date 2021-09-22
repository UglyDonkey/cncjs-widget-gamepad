import {makeAutoObservable} from "mobx";

export class Knob {
    enabled: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggle() {
        this.enabled = !this.enabled;
    }

    off() {
        this.enabled = false;
    }
}
