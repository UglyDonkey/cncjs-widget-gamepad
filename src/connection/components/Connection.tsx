import {observer} from "mobx-react-lite";
import connectionStatus from "../connectionStatus";

export const Connection = observer(() => <div>Port: {connectionStatus.port}</div>);
