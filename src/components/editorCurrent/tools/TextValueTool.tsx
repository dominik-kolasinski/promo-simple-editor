import React, { useState } from "react";
import uuidv4 from "uuidv4";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addWorkbenchItem,
  updateWorkbenchItem
} from "../../../state/ducks/editorCurrent/actions";
import { WorkbenchItem } from "../../../state/ducks/editorCurrent/types";
import { ApplicationState } from "../../../state/ducks";
import StyledButton from "../../common/StyledButton";

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
    <StyledTextValueContainer>
      <StyledTextValueInput
        type="text"
        value={textValue}
        onChange={handleChange}
        placeholder="Type something"
      />
      <StyledButton
        onClick={handleTextValueButtonClick}
        disabled={!textValue}
        style={{ width: "6rem" }}
      >
        {textAdded ? "Update" : "Add"}
      </StyledButton>
    </StyledTextValueContainer>
  );
};

const StyledTextValueContainer = styled.div`
  display: flex;
  width: 19rem;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem;
  margin: 1.2rem 1.2rem 0 1.2rem;
  background: #fff;
  border: 0 solid rgba(0, 0, 0, 0.25);
  box-shadow: rgba(0, 0, 0, 0.25) 0 0.1rem 0.4rem;
  border-radius: 0.4rem;
`;

const StyledTextValueInput = styled.input`
  font-size: 1.4rem;
  height: 2rem;
  width: 11rem;
  outline: none;
`;

export default TextValueTool;
