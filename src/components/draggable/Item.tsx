import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useDrag } from "react-dnd";
// import ContextMenu from "react-context-menu";
import {
  LogoSettings,
  TextSettings,
  WorkbenchItem
} from "../../state/ducks/editorCurrent/types";
import { removeWorkbenchItem } from "../../state/ducks/editorCurrent/actions";

const dragStyle: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  background: "transparent"
};

// const dragStyleLogo: React.CSSProperties = {
//   position: "absolute",
//   background: "transparent"
// };

export interface ItemProps {
  id?: any;
  type: string;
  left?: number;
  top?: number;
  hideSourceOnDrag?: boolean;
  textSettings?: TextSettings;
  logoSettings?: LogoSettings;
  // onCLick(): void;
}

interface Items {
  items: WorkbenchItem[];
}

// const style = {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   border: "solid 1px #ddd",
//   background: "transparent"
// };

const Item: React.FC<ItemProps> = ({
  id,
  type,
  left,
  top,
  hideSourceOnDrag,
  textSettings,
  logoSettings
}) => {
  const dispatch = useDispatch();
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [toDeleteId, setToDeleteId] = useState("");

  const handleItemClick = (itemId: string) => {
    setDeleteVisible(true);
    setToDeleteId(itemId);
  };

  const handleItemDelete = () => {
    dispatch(removeWorkbenchItem(toDeleteId));
    setDeleteVisible(false);
    setToDeleteId("");
  };

  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div ref={drag} style={{ ...dragStyle, left, top }}>
      {/* {!deleteVisible && (
        <button onClick={() => handleItemDelete()}>Delete</button>
      )} */}
      {type === "text" ? (
        <StyledSpan textSettings={textSettings}>
          {textSettings!.value}
        </StyledSpan>
      ) : (
        <StyledLogo
          logoSettings={logoSettings}
          src={logoSettings!.imageUrl}
          alt={logoSettings!.imageUrl}
        />
      )}
    </div>
  );
};

const StyledSpan = styled.span<{
  textSettings?: TextSettings;
}>`
  position: absolute;
  background: transparent;
  /* color: #000;
  font-size: 20px; */
  cursor: move;
  ${({ textSettings }) =>
    textSettings &&
    `
  color:${textSettings.fontColor};
  font-family:${textSettings.font};
  font-size:${textSettings.fontSize}px;
  font-style:${textSettings.fontStyle};
  `}
`;
const StyledLogo = styled.img<{ logoSettings?: LogoSettings }>`
  position: absolute;
  cursor: move;
  width: 100px;
  height: 100px;
  ${({ logoSettings }) =>
    logoSettings &&
    `
  width:${logoSettings.dimensions!.width}px;
  height:${logoSettings.dimensions!.height}px;
  `}
  &:hover {
  }
`;

export default Item;
