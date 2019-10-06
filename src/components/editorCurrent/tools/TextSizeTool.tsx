import React from "react";
import styled from "styled-components";
import { Plus } from "styled-icons/boxicons-regular/Plus";
import { Minus } from "styled-icons/boxicons-regular/Minus";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../state/ducks";
import { WorkbenchItem } from "../../../state/ducks/editorCurrent/types";
import { updateWorkbenchItem } from "../../../state/ducks/editorCurrent/actions";
import StyledButton from "../../common/StyledButton";

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
    <StyledSizeButtonsContainer>
      <StyledButton
        onClick={handleTextSizeButtonClickUp}
        disabled={!state.textItem}
      >
        <span>
          Bigger <Plus size={14} />
        </span>
      </StyledButton>
      <StyledButton
        onClick={() => handleTextSizeButtonClickDown()}
        disabled={!state.textItem}
      >
        <span>
          Smaller <Minus size={14} />
        </span>
      </StyledButton>
    </StyledSizeButtonsContainer>
  );
};

const StyledSizeButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export default TextSizeTool;
