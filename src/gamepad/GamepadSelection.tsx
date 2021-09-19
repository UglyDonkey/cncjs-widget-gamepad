import {observer} from "mobx-react-lite";
import gamepadConnection from "./GamepadConnection";
import {Gamepad} from "./Gamepad";
import {OneLine} from "../common/OneLine";

export const GamepadSelection = observer(() => (
    <div>
        {gamepadConnection.available.length === 0 ?
            'no gamepads detected'
            :
            gamepadConnection.available.map(gamepad => <GamepadOption key={gamepad.index} gamepad={gamepad}/>)}
    </div>
));

const GamepadOption = ({gamepad}: {gamepad: Gamepad}) => {
    const {name} = gamepad;

    return <OneLine as='button' onClick={() => gamepadConnection.select(gamepad)}>{name}</OneLine>
};
