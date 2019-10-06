import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Italic } from "styled-icons/boxicons-regular/Italic";
import { Bold } from "styled-icons/boxicons-regular/Bold";
import { Underline } from "styled-icons/boxicons-regular/Underline";
import { ApplicationState } from "../../../state/ducks";
import { WorkbenchItem } from "../../../state/ducks/editorCurrent/types";
import { updateWorkbenchItem } from "../../../state/ducks/editorCurrent/actions";
import StyledButton from "../../common/StyledButton";

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
    <StyledButtonContainer>
      <StyledButton
        onClick={() => handleFontStyleButtonClick("bold")}
        disabled={!state.textItem}
      >
        <span>
          Bold <Bold size={14} />
        </span>
      </StyledButton>
      <StyledButton
        onClick={() => handleFontStyleButtonClick("underline")}
        disabled={!state.textItem}
      >
        <span>
          Underline <Underline size={14} />
        </span>
      </StyledButton>
      <StyledButton
        onClick={() => handleFontStyleButtonClick("italic")}
        disabled={!state.textItem}
      >
        <span>
          Italic <Italic size={14} />
        </span>
      </StyledButton>
    </StyledButtonContainer>
  );
};

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default TextFontStyleTool;
