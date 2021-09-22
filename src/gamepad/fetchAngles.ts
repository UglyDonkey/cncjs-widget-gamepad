import gamepadConnection from "./GamepadConnection";

const {PI} = Math;

const fetchAngles = (): [number | undefined, number | undefined] => {
    const {selected} = gamepadConnection;
    if(!selected) {
        return [undefined, undefined];
    }

    const gamepad = navigator.getGamepads()[selected.index];
    if(!gamepad) {
        return [undefined, undefined];
    }

    const {axes} = gamepad;

    return [toAngle(axes[0], axes[1]), toAngle(axes[2], axes[3])];
}

const toAngle = (a: number, b: number) => {
    if(a * a + b * b < 0.8) {
        return undefined;
    }

    const angle = Math.atan(a / b);
    if( b > 0 ) {
        return PI - angle;
    } else if ( a > 0) {
        return -angle;
    } else {
        return 2*PI - angle
    }
}

export default fetchAngles;
