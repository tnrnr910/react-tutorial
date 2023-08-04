import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/user";
import { SIGNUP_ERROR_CODES } from "../lib/firebase/error";

export default function Signup() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const isValidForm = () => {
    if (!inputs.email) {
      alert("이메일을 입력해주세요.");
      return false;
    }

    if (!inputs.password) {
      alert("비밀번호를 입력해주세요.");
      return false;
    }

    if (!inputs.passwordConfirm) {
      alert("비밀번호 확인을 입력해주세요.");
      return false;
    }

    if (inputs.password !== inputs.passwordConfirm) {
      alert("'비밀번호'와 '비밀번호 확인'이 일치하지 않습니다.");
      return false;
    }

    return true;
  };

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
      dispatch(setUser({ email: inputs.email }));
      navigate("/");
    } catch (error) {
      if (SIGNUP_ERROR_CODES[error.code]) {
        return alert(SIGNUP_ERROR_CODES[error.code]);
      } else {
        return alert("알 수 없는 에러입니다. 나중에 다시 시도해보세요.");
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
          <form>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                name="email"
                value={inputs.email}
                onChange={changeHandler}
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
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                name="password"
                placeholder="비밀번호"
                type="password"
                value={inputs.password}
                onChange={changeHandler}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                type="password"
                value={inputs.passwordConfirm}
                onChange={changeHandler}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <button
                type="button"
                onClick={async () => {
                  if (isValidForm()) {
                    await signup();
                  }
                }}
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
                type="button"
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
