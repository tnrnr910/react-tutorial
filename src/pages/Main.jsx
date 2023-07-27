import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { useItems } from "../shared/router";

export default function Main() {
  const navigate = useNavigate();

  const { items, deleteItem } = useItems(); // useItems 훅으로부터 items 배열과 deleteItem 함수를 가져옴

  return (
    <>
      <Header />
      <Container>
        {/* 추가버튼 영역 */}
        <AreaAdd>
          {/* 추가 버튼 */}
          <ButtonAdd
            onClick={() => {
              navigate("/create");
            }}
          >
            추가
          </ButtonAdd>
        </AreaAdd>
        {/* 게시글 영역 */}
        {/* map으로 위에서 지정한 useState인 items(배열 형태)를 펼치고 
        그 안의 key인 item의 id에 따라 AreaPost, 즉 ()안의 모양새로 배치시키는 것.
        단순 반복을 안 해도 돼서 꿀이다. ^^7  */}
        {items.length === 0 ? (
          <div>
            항목이 없습니다.
            <br />
            <br />
            추가 버튼을 눌러 항목을 추가해보세요!
          </div>
        ) : (
          items.map((item) => (
            <AreaPost key={item.id}>
              {/* 게시글 텍스트 */}
              <AreaText
                onClick={() => {
                  navigate(`/detail/${item.id}`);
                }}
              >
                {/* 제목 */}
                <h2>{item.title}</h2>
                {/* 본문 영역 */}
                <AreaContent>{item.content}</AreaContent>
              </AreaText>
              {/* 편집 영역 */}
              <AreaEdit>
                {/* 작성자 */}
                <div>{item.author}</div>
                <div>
                  {/* 수정 버튼 */}
                  <ButtonModify
                    onClick={() => {
                      navigate(`/edit/${item.id}`);
                    }}
                  >
                    수정
                  </ButtonModify>
                  {/* 삭제 버튼 */}
                  <ButtonDelete
                    onClick={() => {
                      const isDeletable =
                        window.confirm("정말 삭제하시겠습니까?");
                      if (isDeletable) {
                        deleteItem(item.id);
                        alert("삭제되었습니다.");
                      }
                    }}
                  >
                    삭제
                  </ButtonDelete>
                </div>
              </AreaEdit>
            </AreaPost>
          ))
        )}
      </Container>
    </>
  );
}

const AreaAdd = styled.div`
  display: flex;
  justify-content: end;
  padding: 12px;
`;
const ButtonAdd = styled.button`
  border: none;
  padding: 8px;
  border-radius: 6px;
  background-color: skyblue;
  color: white;
  cursor: pointer;
`;

const AreaPost = styled.div`
  background-color: #eeeeee;
  height: 100px;
  border-radius: 24px;
  margin-bottom: 12px;
  display: flex;
  padding: 12px 16px 12px 16px;
`;

const AreaText = styled.div`
  flex: 4;
  border-right: 1px solid lightgrey;
  cursor: pointer;
`;

const AreaContent = styled.p`
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AreaEdit = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-around;
  gap: 12px;
`;

const ButtonModify = styled.button`
  border: none;
  padding: 8px;
  border-radius: 6px;
  background-color: orange;
  color: white;
  cursor: pointer;
  margin-right: 6px;
`;

const ButtonDelete = styled.button`
  border: none;
  padding: 8px;
  border-radius: 6px;
  background-color: red;
  color: white;
  cursor: pointer;
`;
