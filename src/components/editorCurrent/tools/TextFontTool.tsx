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

interface TextFontToolState {
  textItem: WorkbenchItem;
}

const TextFontTool: React.FC = () => {
  const dispatch = useDispatch();
  const state: TextFontToolState = useSelector(
    ({ editorCurrent }: ApplicationState) => ({
      textItem: editorCurrent.workbenchItems.filter(
        item => item.type === "text"
      )[0]
    })
  );

  const handleOptionChange = (
    changeEvent: React.FormEvent<HTMLInputElement>
  ) => {
    if (
      state.textItem.textSettings &&
      state.textItem.textSettings.font !== changeEvent.currentTarget.value
    ) {
      const itemUpdate = {
        type: "text",
        textSettings: { font: changeEvent.currentTarget.value }
      };
      dispatch(updateWorkbenchItem(itemUpdate));
    }
  };

  return (
    <>
      <input
        type="radio"
        name="fontfamily"
        value="'Arial', Helvetica, sans-serif"
        disabled={!state.textItem}
        onChange={handleOptionChange}
      />{" "}
      Arial
      <input
        type="radio"
        name="fontfamily"
        value="'Times New Roman', Times, serif"
        disabled={!state.textItem}
        onChange={handleOptionChange}
      />{" "}
      Times New Roman
      <br />
      <input
        type="radio"
        name="fontfamily"
        value="'Open Sans', sans-serif"
        disabled={!state.textItem}
        onChange={handleOptionChange}
      />{" "}
      Open Sans
    </>
  );
};

export default TextFontTool;
