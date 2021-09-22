import {JoggerView} from "./jogger/JoggerView";
import {KnobView} from "./knob/KnobView";
import {HorizontalLayout} from "../common/HorizontalLayout";
import React, {useState} from "react";

const modes: {[key: string]: React.FC} = {
    Knob: KnobView,
    'Jogger (Experimental)': JoggerView,
}

export const ControllerModeSelect = () => {
    const [mode, setMode] = useState(() => Object.keys(modes)[0]);
    const View = modes[mode];

    return <div>
        <HorizontalLayout>
            {Object.keys(modes).map((key) => <button key={key} onClick={() => setMode(key)} disabled={mode === key}>{key}</button>)}
        </HorizontalLayout>
        <View />
    </div>
}
