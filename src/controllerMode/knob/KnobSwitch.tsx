import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {OneLine} from "../../common/OneLine";
import knob from "./index";

export const KnobSwitch = observer(() => {
    useEffect(() => () => knob.off(), []);

    return (
        <OneLine as='button' onClick={() => knob.toggle()}>
            {knob.enabled ? 'knob enabled' : 'knob stopped'}
        </OneLine>
    );
});
