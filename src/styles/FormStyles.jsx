import styled from "styled-components";

export const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const StButton = styled.button`
  margin-top: 30px;
  background-color: ${(props) => (props.disabled ? "gray" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border: 1px solid;
  font-weight: 700;
  padding: 10px;
  :hover {
    background-color: ${(props) => (props.disabled ? "#757575" : "#eeeeee")};
  }
`;
