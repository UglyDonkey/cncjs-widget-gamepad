import React from 'react';
import {GamepadStatus} from "./gamepad/GamepadStatus";
import {GamepadSelection} from "./gamepad/GamepadSelection";
import styled from "styled-components";
import {Connection} from "./connection/components/Connection";
import {JogSwitch} from "./jogger/JogSwitch";

const App = () => (
    <AppDiv>
        <Connection />
        <JogSwitch />
        <GamepadStatus/>
        <GamepadSelection/>
    </AppDiv>
);

const AppDiv = styled.div`
    padding: 10px;
`

export default App;
