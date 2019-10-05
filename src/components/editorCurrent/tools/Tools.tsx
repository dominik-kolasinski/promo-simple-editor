import React from "react";
import styled from "styled-components";
import Logo from "../../draggable/Logo";
import TextValueTool from "./TextValueTool";
import TextFontTool from "./TextFontTool";
import TextSizeTool from "./TextSizeTool";
import TextColorTool from "./TextColorTool";
import TextFontStyleTool from "./TextFontStyleTool";

const Tools: React.FC = () => {
  return (
    <StyledToolsContainer>
      <StyledLogosContainer>
        <Logo logoImageUrl="/assets/logo_one.png" />
        <Logo logoImageUrl="/assets/logo_two.png" />
        <Logo logoImageUrl="/assets/logo_three.png" />
      </StyledLogosContainer>
      <StyledTextToolsContainer>
        <TextValueTool />
        <TextColorTool />
        <TextFontTool />
        <TextFontStyleTool />
        <TextSizeTool />
      </StyledTextToolsContainer>
    </StyledToolsContainer>
  );
};

const StyledToolsContainer = styled.div`
  width: 400px;
  height: 100%;
`;

const StyledLogosContainer = styled.div`
  display: flex;
  width: 400px;
  height: 100%;
`;

const StyledTextToolsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 276px;
  height: 100%;
`;

export default Tools;
