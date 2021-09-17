import gamepadConnection from "./GamepadConnection";

const setupListeners = () => {
    window.addEventListener("gamepadconnected", e => {
        const {index, id} = (e as GamepadEvent).gamepad;
        gamepadConnection.connected({index, name: id});
    });

    window.addEventListener("gamepaddisconnected", e => {
        const {index, id} = (e as GamepadEvent).gamepad;
        gamepadConnection.disconnected({index, name: id});
    });
}

export default setupListeners;
