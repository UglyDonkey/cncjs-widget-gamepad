import gamepadConnection from "./GamepadConnection";

const fetchControls = () => {
    const {selected} = gamepadConnection;
    if(!selected) {
        return;
    }

    const gamepad = navigator.getGamepads()[selected.index];
    if(!gamepad) {
        return;
    }
    const {axes} = gamepad;
    return {x: deadzone(axes[0]), y: deadzone(axes[3]), z: deadzone(axes[1])};
}

const deadzone = (value: number) => {
    if(Math.abs(value) < 0.1) return 0;
    else if(value > 0) return value - 0.1;
    else return value + 0.1;
}

export default fetchControls;
