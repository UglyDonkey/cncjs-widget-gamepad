import {makeAutoObservable} from "mobx";

export class Jogger {
    enabled: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggle() {
        this.enabled = !this.enabled;
    }
}


