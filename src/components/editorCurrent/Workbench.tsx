import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ApplicationState } from "../../state/ducks/";
import Container from "../draggable/Container";
import htmlToImage from "html-to-image";

interface WorkbenchState {
  workbenchBackground: string | null;
}

const Workbench: React.FC = () => {
  const state: WorkbenchState = useSelector(
    ({ editorCurrent }: ApplicationState) => ({
      workbenchBackground: editorCurrent.workbenchBackground
    })
  );

  const handleImageDownload = () => {
    htmlToImage
      .toCanvas(document.getElementById("workbenchToImage")!)
      .then(function(canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "workbenchToImage.jpg";
        link.click();
      });
  };

  return (
    <div style={{ height: "400px" }}>
      <div id="workbenchToImage">
        <StyledWorkbenchBackground
          workbenchBackground={state.workbenchBackground}
        >
          <Container hideSourceOnDrag={true} />
        </StyledWorkbenchBackground>
      </div>
      <button onClick={() => handleImageDownload()}>download as image</button>
    </div>
  );
};

const StyledWorkbenchBackground = styled.div<{
  workbenchBackground: string | null;
}>`
  position: relative;
  width: 400px;
  height: 400px;
  overflow: hidden;
  background-size: cover;
  background-image: url("/assets/empty_background.bmp");
  ${({ workbenchBackground }) =>
    workbenchBackground && `background-image: url("${workbenchBackground}");`}
`;

export default Workbench;
