import React from "react";
import styled from "styled-components";
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
    <StylecTextColorToolCntainer>
      {state.textItem && (
        <TwitterPicker color={"#fff"} onChangeComplete={handleChangeComplete} />
      )}
    </StylecTextColorToolCntainer>
  );
};

const StylecTextColorToolCntainer = styled.div`
  margin-top: 18px;
`;

export default TextColorTool;
