import React from 'react';
import {GamepadStatus} from "./gamepad/GamepadStatus";
import {GamepadSelection} from "./gamepad/GamepadSelection";
import styled from "styled-components";
import {Connection} from "./connection/components/Connection";
import {JogSwitch} from "./jogger/JogSwitch";
import {JoggerSettings} from "./jogger/JoggerSettings";
import {GamepadSettings} from "./gamepad/GamepadSettings";

const App = () => (
    <AppDiv>
        <Connection />
        <JogSwitch />
        <JoggerSettings />
        <GamepadStatus />
        <GamepadSelection />
        <GamepadSettings />
    </AppDiv>
);

const AppDiv = styled.div`
    padding: 10px;
`

export default App;
