import jogger from "./";
import {observer} from "mobx-react-lite";
import {OneLine} from "../common/OneLine";

export const JogSwitch = observer(() => (
    <OneLine as='button' onClick={() => jogger.toggle()}>
        {jogger.enabled ? 'jogging enabled' : 'jogging stopped'}
    </OneLine>
));
