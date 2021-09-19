import {makeAutoObservable} from "mobx";

export class Jogger {
    enabled: boolean = false;
    maxFeedRate: number = 300;

    constructor() {
        makeAutoObservable(this);
    }

    toggle() {
        this.enabled = !this.enabled;
    }

    setMaxFeedRate(maxFeedRate: number) {
        this.maxFeedRate = maxFeedRate;
    }
}


