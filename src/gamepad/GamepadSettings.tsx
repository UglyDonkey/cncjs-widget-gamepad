import {observer} from "mobx-react-lite";
import gamepadConnection from "./GamepadConnection";

export const GamepadSettings = observer(() => (
    <div>
        Deadzone:{' '}
        <input type='number' value={gamepadConnection.deadzone} onChange={e => gamepadConnection.setDeadzone(Number.parseFloat(e.target.value))}/>
    </div>
));
