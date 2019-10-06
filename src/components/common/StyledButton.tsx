import styled from "styled-components";

const StyledButton = styled.button`
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
  width: 10rem;
  margin: 0.4rem 0;
  &:disabled {
    opacity: 0.4;
  }
  &:focus {
    outline: none;
  }
`;

export default StyledButton;
