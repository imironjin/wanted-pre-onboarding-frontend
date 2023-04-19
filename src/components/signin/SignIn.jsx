import React, { useEffect, useRef } from "react";
import { StButton, StContainer, StForm } from "../../styles/FormStyles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAccessToken, setAccessToken } from "../token/handleToken";
import { useState } from "react";

const SignIn = () => {
  const initialFormState = {
    email: "",
    password: "",
  };
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);

  const formStateRef = useRef(initialFormState);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    formStateRef.current[id] = value;

    if (id === "email") {
      setEmailValid(e.target.value.includes("@"));
    }
    if (id === "password") {
      setPasswordValid(e.target.value.length >= 8);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formStateRef.current;

    try {
      const response = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/auth/signin",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const access_token = response.data.access_token;
        setAccessToken(access_token);
        alert("로그인 성공");
        navigate("/todo");
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      alert("로그인 실패");
    }
  };

  useEffect(() => {
    const isToken = getAccessToken();
    if (isToken) {
      navigate("/todo");
    }
  }, []);

  return (
    <StContainer>
      <h1>로그인</h1>
      <StForm onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          placeholder="이메일"
          data-testid="email-input"
          onChange={handleChangeInput}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호"
          data-testid="password-input"
          onChange={handleChangeInput}
        />
        <StButton
          type="submit"
          data-testid="signin-button"
          disabled={!isEmailValid || !isPasswordValid}
        >
          로그인
        </StButton>
      </StForm>
    </StContainer>
  );
};

export default SignIn;
