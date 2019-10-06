import React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";

import configureStore from "./state";
import EditorCurrent from "./components/editorCurrent/EditorCurrent";

const initialState = (window as any).initialReduxState;
const store = configureStore(initialState);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StyledAppContainer>
        <EditorCurrent />
      </StyledAppContainer>
    </Provider>
  );
};

const StyledAppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120rem;
  min-height: 80rem;
  background: linear-gradient(to right, #12c2e9, #c471ed, #ff4070);
  height: 100vh;
`;

export default App;
