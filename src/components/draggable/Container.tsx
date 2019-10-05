import React, { useState } from "react";
import { useDrop, XYCoord } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import uuidv4 from "uuidv4";
import html2canvas from "html2canvas";
import htmlToImage from "html-to-image";
import { ApplicationState } from "../../state/ducks";
import {
  updateWorkbenchItem,
  addWorkbenchItem,
  removeWorkbenchItem
} from "../../state/ducks/editorCurrent/actions";
import {
  WorkbenchItem,
  TextSettings,
  LogoSettings
} from "../../state/ducks/editorCurrent/types";

import Item from "./Item";

const styles: React.CSSProperties = {
  width: 400,
  height: 400,
  position: "relative"
};

interface ContainerProps {
  hideSourceOnDrag: boolean;
}

interface ContainerState {
  items: WorkbenchItem[];
}

const Container: React.FC<ContainerProps> = ({ hideSourceOnDrag }) => {
  const dispatch = useDispatch();
  const containerState: ContainerState = useSelector(
    ({ editorCurrent }: ApplicationState) => ({
      items: editorCurrent.workbenchItems
    })
  );

  const [, drop] = useDrop({
    accept: ["text", "logo"],
    drop(
      item: {
        type: string;
        id: string;
        top: number;
        left: number;
        textSettings?: TextSettings;
        logoSettings?: LogoSettings;
        logoImageUrl: string;
      },
      monitor
    ) {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const left = Math.round(item.left! + delta.x);
      const top = Math.round(item.top! + delta.y);
      if (item.type === "text" && item.id) {
        moveItem(item.id, left, top, item.type);
      }
      if (item.type === "logo" && !item.id) {
        const logoToDrop = item.logoImageUrl;
        const logoToAdd: WorkbenchItem = {
          id: uuidv4(),
          top: 150,
          left: 150,
          type: "logo",
          logoSettings: {
            imageUrl: logoToDrop,
            dimensions: { width: 100, height: 100 }
          }
        };
        dispatch(addWorkbenchItem(logoToAdd));
      }
      if (item.type === "logo" && item.id) {
        moveItem(item.id, left, top, item.type);
      }
      return undefined;
    }
  });

  const moveItem = (id: string, left: number, top: number, type: string) => {
    // dispatch(updateWorkbenchItem({ [id]: { left, top, type } }));
    // const itemUpdate = {
    //   type: "text",
    //   textSettings: { value: textValue, fontColor: "red" }
    // };
    // dispatch(updateWorkbenchItem(itemUpdate));
    const itemUpdate = {
      type,
      top,
      left
    };
    dispatch(updateWorkbenchItem(itemUpdate, id));
  };

  return (
    <div ref={drop} style={styles} id="workbenchToImage">
      {/* {deleteVisible && (
        <button onClick={() => handleItemDelete()}>Delete</button>
      )} */}
      {containerState.items.map(item => {
        return (
          <Item
            type={item.type}
            {...item}
            key={item.id}
            id={item.id}
            hideSourceOnDrag={hideSourceOnDrag}
            // onCLick={() => handleItemClick(item.id as string)}
          />
        );
      })}
    </div>
  );
};
export default Container;
