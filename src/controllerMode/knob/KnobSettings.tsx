import {observer} from "mobx-react-lite";
import knob from "./index";

export const KnobSettings = observer(() => (
    <div>
        Sensitivity: {' '}
        <input type="number" step={0.1} min={0.1} value={knob.sensitivity} onChange={e => knob.setSensitivity(Number.parseFloat(e.target.value))} />
    </div>
))
