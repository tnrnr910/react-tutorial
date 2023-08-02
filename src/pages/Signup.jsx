import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "../firebase"; // firebase.js에서 auth를 불러옴

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("handleSignup 함수 호출 확인");
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      // 비밀번호 유효성 검사
      if (password.length < 6) {
        alert("비밀번호는 6자리 이상 입력해주세요.");
        return;
      }
      // 이메일 유효성 검사
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        alert("올바른 이메일 형식을 입력해주세요.");
        return;
      }

      // Firebase 회원가입
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      // 회원가입 완료 시 확인
      alert("회원가입이 완료되었습니다.");
      // 입력 필드 초기화
      setEmail("");
      setPassword("");
      setPasswordConfirm("");

      // 회원가입이 완료된 후 로그인 페이지로 이동
      navigate("/login");
    } catch (error) {
      console.error("회원가입 에러:", error);
      // 회원가입 유효성 검사
      if (error.code === "auth/email-already-in-use") {
        alert("중복된 이메일입니다.");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}
        >
          <form onSubmit={handleSignup}>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                type="email"
                placeholder="이메일"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                type="password"
                placeholder="비밀번호"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                type="password"
                placeholder="비밀번호 확인"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <button
                type="submit"
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                회원가입하기
              </button>
            </div>
            <div
              style={{
                width: "360px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
