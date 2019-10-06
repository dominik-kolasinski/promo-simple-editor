import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../state/ducks";
import { WorkbenchItem } from "../../../state/ducks/editorCurrent/types";
import { updateWorkbenchItem } from "../../../state/ducks/editorCurrent/actions";

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
    <StyledFontsList>
      <StyledFontsListItem>
        <RadioButton
          type="radio"
          name="fontfamily"
          value="'Arial', Helvetica, sans-serif"
          disabled={!state.textItem}
          onChange={handleOptionChange}
        />
        <RadioButtonLabel />
        Arial
      </StyledFontsListItem>
      <StyledFontsListItem>
        <RadioButton
          type="radio"
          name="fontfamily"
          value="'Times New Roman', Times, serif"
          disabled={!state.textItem}
          onChange={handleOptionChange}
        />
        <RadioButtonLabel />
        Times New Roman
      </StyledFontsListItem>
      <StyledFontsListItem>
        <RadioButton
          type="radio"
          name="fontfamily"
          value="'Open Sans', sans-serif"
          disabled={!state.textItem}
          onChange={handleOptionChange}
        />
        <RadioButtonLabel />
        Open Sans
      </StyledFontsListItem>
    </StyledFontsList>
  );
};

const StyledFontsList = styled.div``;
const StyledFontsListItem = styled.div`
  font-size: 1.4rem;
  padding: 0;
  margin: 0.4rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  left: 0.4rem;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: white;
  border: 1px solid #bebebe;
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.8rem;
  &:hover ~ ${RadioButtonLabel} {
    background: #bebebe;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 0.8rem;
      height: 0.8rem;
      margin: 0.3rem;
      background: #eee;
    }
  }
  &:checked + ${RadioButtonLabel} {
    background: #c471ed;
    border: 1px solid #c471ed;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 0.8rem;
      height: 0.8rem;
      margin: 0.3rem;
      box-shadow: 0.1rem 0.3rem 0.3rem 0.1rem rgba(0, 0, 0, 0.1);
      background: #fff;
    }
  }
`;

export default TextFontTool;
