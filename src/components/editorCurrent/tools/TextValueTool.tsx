import React, { useState } from "react";
import uuidv4 from "uuidv4";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkbenchItem,
  updateWorkbenchItem
} from "../../../state/ducks/editorCurrent/actions";
import { WorkbenchItem } from "../../../state/ducks/editorCurrent/types";
import { ApplicationState } from "../../../state/ducks";

interface TextValueToolState {
  items: WorkbenchItem[];
}
const TextValueTool: React.FC = () => {
  const dispatch = useDispatch();
  const state: TextValueToolState = useSelector(
    ({ editorCurrent }: ApplicationState) => ({
      items: editorCurrent.workbenchItems
    })
  );

  const textAdded = state.items.filter(item => item.type === "text").length;
  const [textValue, setTextValue] = useState("");
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTextValue(e.currentTarget.value);
  };

  const textId = uuidv4();
  const handleTextValueButtonClick = () => {
    if (!textAdded) {
      dispatch(addWorkbenchItem(textToAdd));
    } else {
      const itemUpdate = {
        type: "text",
        textSettings: { value: textValue }
      };
      dispatch(updateWorkbenchItem(itemUpdate));
    }
  };

  const textToAdd = {
    id: textId,
    top: 190,
    left: 150,
    type: "text",
    textSettings: {
      value: textValue,
      font: "Arial, Helvetica, sans-serif",
      fontSize: 20,
      fontColor: "#000",
      fontStyle: "none"
    }
  };
  return (
    <>
      <input
        type="text"
        value={textValue}
        onChange={handleChange}
        placeholder="type something"
      />
      <button onClick={handleTextValueButtonClick} disabled={!textValue}>
        {textAdded ? "Update text" : "Add text"}
      </button>
    </>
  );
};

export default TextValueTool;
