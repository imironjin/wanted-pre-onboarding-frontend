import axios from "axios";
import React, { useEffect, useState } from "react";
import { StButton, StContainer, StForm } from "../../styles/FormStyles";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../token/handleToken";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(e.target.value.includes("@"));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(e.target.value.length >= 8);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/auth/signup",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("회원가입 성공");
        navigate("/signin");
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      alert("회원가입 실패");
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
      <h1>회원가입</h1>
      <StForm onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          placeholder="이메일"
          data-testid="email-input"
          onChange={handleEmailChange}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호"
          data-testid="password-input"
          onChange={handlePasswordChange}
        />
        <StButton
          type="submit"
          data-testid="signup-button"
          disabled={!isEmailValid || !isPasswordValid}
        >
          회원가입
        </StButton>
      </StForm>
    </StContainer>
  );
};

export default SignUp;
