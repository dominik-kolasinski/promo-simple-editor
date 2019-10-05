import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import styled from "styled-components";
import BackgroundList from "./BackgroundList";
import Workbench from "./Workbench";
import Tools from "./tools/Tools";

const EditorCurrent: React.FC = () => {
  return (
    <StyledEditorCurrent>
      <BackgroundList />
      <DndProvider backend={HTML5Backend}>
        <Workbench />
        <Tools />
      </DndProvider>
    </StyledEditorCurrent>
  );
};

const StyledEditorCurrent = styled.div`
  display: flex;
`;

export default EditorCurrent;
