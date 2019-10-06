import React from "react";
import styled, { keyframes } from "styled-components";
import { TwitterPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../state/ducks";
import { WorkbenchItem } from "../../../state/ducks/editorCurrent/types";
import { updateWorkbenchItem } from "../../../state/ducks/editorCurrent/actions";

interface TextColorToolState {
  textItem: WorkbenchItem;
}

const TextColorTool: React.FC = () => {
  const dispatch = useDispatch();
  const state: TextColorToolState = useSelector(
    ({ editorCurrent }: ApplicationState) => ({
      textItem: editorCurrent.workbenchItems.filter(
        item => item.type === "text"
      )[0]
    })
  );

  const handleChangeComplete = (color: any) => {
    const itemUpdate = {
      type: "text",
      textSettings: { fontColor: color.hex }
    };
    dispatch(updateWorkbenchItem(itemUpdate));
  };

  return (
    <>
      {state.textItem && (
        <StyledTextColorToolCotainer>
          <TwitterPicker
            width={"214px"}
            color={"#fff"}
            onChangeComplete={handleChangeComplete}
          />
        </StyledTextColorToolCotainer>
      )}
    </>
  );
};

const containerAppearingFrames = keyframes`
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: 12.6rem;
    opacity:1;
  }
`;

const StyledTextColorToolCotainer = styled.div`
  margin: 1.2rem 1.2rem 0 1.2rem;
  width: 19rem;
  position: relative;
  animation-name: ${containerAppearingFrames};
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
`;

export default TextColorTool;
