import React from 'react';
import {GamepadStatus} from "./gamepad/GamepadStatus";
import {GamepadSelection} from "./gamepad/GamepadSelection";
import styled from "styled-components";
import {Connection} from "./connection/components/Connection";
import {GamepadSettings} from "./gamepad/GamepadSettings";
import {ControllerModeSelect} from "./controllerMode/ControllerModeSelect";

const App = () => (
    <AppDiv>
        <Connection />
        <ControllerModeSelect />
        <GamepadStatus />
        <GamepadSelection />
        <GamepadSettings />
    </AppDiv>
);

const AppDiv = styled.div`
    padding: 10px;
`

export default App;
