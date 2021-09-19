import {observer} from "mobx-react-lite";
import gamepadConnection from "./GamepadConnection";
import {OneLine} from "../common/OneLine";

export const GamepadStatus = observer (() => (
    <OneLine>
        {gamepadConnection.selected
            ?
            `using: ${gamepadConnection.selected.name}`
            :
            'please select gamepad'
        }
    </OneLine>
));
