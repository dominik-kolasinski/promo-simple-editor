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

interface TextFontStyleToolState {
  textItem: WorkbenchItem;
}

const TextFontStyleTool: React.FC = () => {
  const dispatch = useDispatch();
  const state: TextFontStyleToolState = useSelector(
    ({ editorCurrent }: ApplicationState) => ({
      textItem: editorCurrent.workbenchItems.filter(
        item => item.type === "text"
      )[0]
    })
  );

  const handleFontStyleButtonClick = (fontStyle: string) => {
    const itemUpdate = {
      type: "text",
      textSettings: { fontStyle }
    };
    dispatch(updateWorkbenchItem(itemUpdate));
  };

  return (
    <>
      <button
        onClick={() => handleFontStyleButtonClick("bold")}
        disabled={!state.textItem}
      >
        Bold
      </button>
      <button
        onClick={() => handleFontStyleButtonClick("underline")}
        disabled={!state.textItem}
      >
        Underline
      </button>
      <button
        onClick={() => handleFontStyleButtonClick("italic")}
        disabled={!state.textItem}
      >
        Italic
      </button>
    </>
  );
};

export default TextFontStyleTool;
