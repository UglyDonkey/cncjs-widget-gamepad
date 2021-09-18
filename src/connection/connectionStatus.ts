import {makeAutoObservable} from "mobx";

export class ConnectionStatus {
    port?: string;

    constructor() {
        makeAutoObservable(this)
    }

    setPort(port?: string) {
        this.port = port;
    }
}

const connectionStatus = new ConnectionStatus();

export default connectionStatus;
