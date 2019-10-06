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
        <StyledModificationsContainer>
          <TextFontTool />
          <TextFontStyleTool />
          <TextSizeTool />
        </StyledModificationsContainer>
      </StyledTextToolsContainer>
    </StyledToolsContainer>
  );
};

const StyledToolsContainer = styled.div`
  width: 23.2rem;
  height: 100%;
`;

const StyledLogosContainer = styled.div`
  display: flex;
  width: 19rem;
  margin: 0 1.2rem;
  height: 100%;
`;

const StyledTextToolsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 19rem;
  height: 100%;
`;

const StyledModificationsContainer = styled.div`
  z-index: 500;
  display: flex;
  flex-direction: column;
  width: 19rem;
  height: 24.5rem;
  padding: 1.2rem;
  margin: 1.2rem;
  background: #fff;
  border: 0 solid rgba(0, 0, 0, 0.25);
  box-shadow: rgba(0, 0, 0, 0.25) 0 0.1rem 0.4rem;
  border-radius: 0.4rem;
`;

export default Tools;
