import React, { useState } from "react";
import styled from "styled-components";
import uuidv4 from "uuidv4";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../state/ducks";
import { WorkbenchItem } from "../../../state/ducks/editorCurrent/types";
import {
  addWorkbenchItem,
  updateWorkbenchItem
} from "../../../state/ducks/editorCurrent/actions";
import Logo from "../../draggable/Logo";
import TextValueTool from "./TextValueTool";

interface TextSizeToolState {
  textItem: WorkbenchItem;
}

const TextSizeTool: React.FC = () => {
  const dispatch = useDispatch();
  const state: TextSizeToolState = useSelector(
    ({ editorCurrent }: ApplicationState) => ({
      textItem: editorCurrent.workbenchItems.filter(
        item => item.type === "text"
      )[0]
    })
  );

  const handleTextSizeButtonClickUp = () => {
    const itemUpdate = {
      type: "text",
      textSettings: { fontSize: state.textItem.textSettings!.fontSize! + 4 }
    };
    dispatch(updateWorkbenchItem(itemUpdate));
  };

  const handleTextSizeButtonClickDown = () => {
    const itemUpdate = {
      type: "text",
      textSettings: { fontSize: state.textItem.textSettings!.fontSize! - 4 }
    };
    dispatch(updateWorkbenchItem(itemUpdate));
  };

  return (
    <>
      <button onClick={handleTextSizeButtonClickUp} disabled={!state.textItem}>
        Bigger
      </button>
      <button
        onClick={handleTextSizeButtonClickDown}
        disabled={!state.textItem}
      >
        Smaller
      </button>
    </>
  );
};

export default TextSizeTool;
