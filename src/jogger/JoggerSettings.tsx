import {observer} from "mobx-react-lite";
import jogger from "./index";

export const JoggerSettings = observer(() => (
    <div>
        Feed Rate:{' '}
        <input type='number' value={jogger.maxFeedRate} onChange={e => jogger.setMaxFeedRate(Number.parseFloat(e.target.value))}/>
    </div>
));
