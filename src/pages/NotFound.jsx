import React from "react";
import { StContainer } from "../styles/FormStyles";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StParagraph = styled.p`
  font-size: 30px;
`;
const StLink = styled(Link)`
  border: 1px solid;
  font-size: 20px;
  font-weight: 700;
  padding: 10px;
  :hover {
    background-color: yellow;
  }
`;

const NotFound = () => {
  return (
    <StContainer>
      <h1>404 에러!</h1>
      <StParagraph>없는 페이지 입니다.</StParagraph>
      <StLink to="/">click ➡️ 메인 페이지로 이동하기</StLink>
    </StContainer>
  );
};

export default NotFound;
