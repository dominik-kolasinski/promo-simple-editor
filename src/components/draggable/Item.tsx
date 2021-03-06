import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import {
  LogoSettings,
  TextSettings
} from "../../state/ducks/editorCurrent/types";
import { removeWorkbenchItem } from "../../state/ducks/editorCurrent/actions";

const dragStyle: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  background: "transparent",
  outline: "none"
};

export interface ItemProps {
  id?: any;
  type: string;
  left?: number;
  top?: number;
  hideSourceOnDrag?: boolean;
  textSettings?: TextSettings;
  logoSettings?: LogoSettings;
}

const Item: React.FC<ItemProps> = ({
  id,
  type,
  left,
  top,
  hideSourceOnDrag,
  textSettings,
  logoSettings
}) => {
  const refClicked = useRef(null);
  const useOnClickOutside = (ref: any, handler: any) => {
    useEffect(() => {
      const listener = (event: any) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  };
  useOnClickOutside(refClicked, () => setContextMenuOpen(false));

  const dispatch = useDispatch();
  const [isContextMenuOpen, setContextMenuOpen] = useState(false);

  const handleItemDelete = (id: string) => {
    dispatch(removeWorkbenchItem(id));
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

  const handleContextClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setContextMenuOpen(true);
  };

  return (
    <div
      ref={drag}
      style={{ ...dragStyle, left, top }}
      onContextMenu={event => handleContextClick(event)}
      tabIndex={-1}
    >
      <StyledContextMenu ref={refClicked} isContextMenuOpen={isContextMenuOpen}>
        <button onClick={() => handleItemDelete(id)}>Remove</button>
      </StyledContextMenu>
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

const StyledContextMenu = styled.div<{
  isContextMenuOpen: boolean;
}>`
  transition: all 0.2s ease-in-out;
  top: -2.4rem;
  position: absolute;
  z-index: 1000;

  button {
    height: 0;
    opacity: 0;
    top: -1rem;
  }

  ${({ isContextMenuOpen }) =>
    isContextMenuOpen &&
    `
  button {
    opacity:1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c471ed;
    color: #fff;
    border: none;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s;
    height: 2.4rem;
    width: 5.8rem;
    margin: 0.4rem 0;
    &:focus {
      outline: none;
    }
  }
  `}
`;

const StyledSpan = styled.span<{
  textSettings?: TextSettings;
}>`
  position: absolute;
  background: transparent;
  cursor: move;
  white-space: nowrap;

  ${({ textSettings }) =>
    textSettings &&
    `
  color:${textSettings.fontColor};
  font-family:${textSettings.font};
  font-size:${textSettings.fontSize}px;
  font-style:${textSettings.fontStyle};
  font-weight:${textSettings.fontStyle};
  text-decoration:${textSettings.fontStyle};
  `}
`;
const StyledLogo = styled.img<{ logoSettings?: LogoSettings }>`
  position: absolute;
  cursor: move;
  width: 10rem;
  height: 10rem;
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
