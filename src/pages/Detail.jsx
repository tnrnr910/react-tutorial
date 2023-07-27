import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useItems } from "../shared/router";

export default function Detail() {
  const { id } = useParams();
  const { items, deleteItem } = useItems();
  const navigate = useNavigate();

  const currentItem = items.find((item) => item.id === id);

  if (!currentItem) {
    return (
      <>
        <Header />
        <Container>
          <div>해당 항목을 찾을 수 없습니다.</div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <h1
          style={{
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {currentItem.title}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {currentItem.content}
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            onClick={() => {
              navigate("/edit");
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "orange",
              color: "white",
              cursor: "pointer",
              marginRight: "6px",
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              const isDeletable = window.confirm("정말 삭제하시겠습니까?");
              if (isDeletable) {
                deleteItem(id);
                alert("삭제되었습니다.");
                navigate("/");
              }
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
        </div>
      </Container>
    </>
  );
}
