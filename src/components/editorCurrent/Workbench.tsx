import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Download } from "styled-icons/boxicons-regular/Download";
import htmlToImage from "html-to-image";
import { ApplicationState } from "../../state/ducks/";
import Container from "../draggable/Container";
import StyledButton from "../common/StyledButton";

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
    <div style={{ height: "40rem" }}>
      <div id="workbenchToImage">
        <StyledWorkbenchBackground
          workbenchBackground={state.workbenchBackground}
        >
          <Container hideSourceOnDrag={true} />
        </StyledWorkbenchBackground>
      </div>
      <StyledButton
        onClick={() => handleImageDownload()}
        style={{
          width: "17rem",
          backgroundColor: "#12c2e9",
          marginTop: "1.6rem"
        }}
      >
        <span>
          Download as image &nbsp;&nbsp;<Download size={14}></Download>
        </span>
      </StyledButton>
    </div>
  );
};

const StyledWorkbenchBackground = styled.div<{
  workbenchBackground: string | null;
}>`
  position: relative;
  width: 40rem;
  height: 40rem;
  overflow: hidden;
  background-size: cover;
  background-image: url("/assets/empty_background.bmp");
  ${({ workbenchBackground }) =>
    workbenchBackground && `background-image: url("${workbenchBackground}");`}
`;

export default Workbench;
