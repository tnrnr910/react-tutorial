import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { useItems } from "../shared/router";

export default function Create() {
  const navigate = useNavigate();
  const { addItem, getItems } = useItems();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();

    const titleValue = e.target.elements.title.value;
    const contentValue = e.target.elements.content.value;

    // 입력값이 유효한지 확인
    if (!titleValue || !contentValue) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const newItem = {
      id: nanoid(),
      title: titleValue,
      content: contentValue,
      author: "새로운 작성자",
    };

    addItem(newItem);

    // 입력 후 입력값 초기화
    setTitle("");
    setContent("");

    navigate("/");
  };

  return (
    <>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={handleAddItem}
        >
          <div>
            <input
              name="title"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              name="content"
              placeholder="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "skyblue",
              cursor: "pointer",
            }}
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
