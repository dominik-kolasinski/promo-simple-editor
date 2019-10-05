import React from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import styled from "styled-components";

interface LogoProps {
  logoImageUrl: string;
}

const Logo: React.FC<LogoProps> = ({ logoImageUrl }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { logoImageUrl, type: "logo" },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.3 : 1;

  return (
    <StyledThumbnailContainer ref={drag} style={{ opacity }} id={logoImageUrl}>
      <StyledThumbnailImage
        ref={drag}
        id={logoImageUrl}
        src={logoImageUrl}
        alt={`${logoImageUrl} thumbnail`}
      />
    </StyledThumbnailContainer>
  );
};

const StyledThumbnailContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;

const StyledThumbnailImage = styled.img`
  width: 100px;
  height: 100px;
`;

export default Logo;
