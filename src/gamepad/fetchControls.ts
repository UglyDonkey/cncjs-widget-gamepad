import gamepadConnection from "./GamepadConnection";

const fetchControls = () => {
    const {selected} = gamepadConnection;
    if(!selected) {
        return {x: 0, y: 0, z: 0};
    }

    const gamepad = navigator.getGamepads()[selected.index];
    if(!gamepad) {
        return {x: 0, y: 0, z: 0};
    }
    const {axes} = gamepad;
    return {x: deadzone(axes[0]), y: deadzone(axes[1]), z: deadzone(axes[3])};
}

const deadzone = (value: number) => {
    if(Math.abs(value) < 0.15) return 0;
    else if(value > 0) return value - 0.15;
    else return value + 0.15;
}

export default fetchControls;
