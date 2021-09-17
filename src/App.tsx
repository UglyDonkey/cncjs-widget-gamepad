import React from 'react';
import {GamepadStatus} from "./gamepad/GamepadStatus";
import {GamepadSelection} from "./gamepad/GamepadSelection";
import styled from "styled-components";

const App = () => (
    <AppDiv>
        <GamepadStatus/>
        <GamepadSelection/>
    </AppDiv>
);

const AppDiv = styled.div`
    padding: 10px;
`

export default App;
