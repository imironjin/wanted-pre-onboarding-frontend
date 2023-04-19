import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StInner = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StLink = styled(Link)`
  border: 1px solid red;
  font-weight: 700;
  padding: 10px;
  :hover {
    background-color: yellow;
  }
`;
const Main = () => {
  return (
    <StContainer>
      <h1>원티드 프리온보딩 과제</h1>
      <StInner>
        <StLink to="/signup">회원가입 하러가기</StLink>
        <StLink to="/signin">로그인 하러가기</StLink>
      </StInner>
    </StContainer>
  );
};

export default Main;
