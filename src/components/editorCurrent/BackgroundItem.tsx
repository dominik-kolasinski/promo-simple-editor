import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setBackgroundImage } from "../../state/ducks/editorCurrent/actions";

interface BackgroundItemProps {
  url: string;
}

const BackgroundItem: React.FC<BackgroundItemProps> = ({
  url
}: BackgroundItemProps) => {
  const dispatch = useDispatch();

  return (
    <StyledBackgroundItem>
      <img
        src={url}
        alt="random from unsplash.com"
        onClick={() => dispatch(setBackgroundImage(url))}
      />
    </StyledBackgroundItem>
  );
};

const StyledBackgroundItem = styled.li`
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    cursor: pointer;
  }
`;

export default BackgroundItem;
