import jogger from "./index";
import {observer} from "mobx-react-lite";
import {OneLine} from "../../common/OneLine";
import {useEffect} from "react";

export const JogSwitch = observer(() => {
    useEffect(() => () => jogger.off(), []);

    return (
        <OneLine as='button' onClick={() => jogger.toggle()}>
            {jogger.enabled ? 'jogging enabled' : 'jogging stopped'}
        </OneLine>
    );
});
