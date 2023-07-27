import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import Signup from "../pages/Signup";

import { nanoid } from "nanoid";
import { useState } from "react";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
export default Router;

export const initialItems = [
  { id: nanoid(), title: "제목1", content: "내용1", author: "작성자1" },
  { id: nanoid(), title: "제목2", content: "내용2", author: "작성자2" },
  { id: nanoid(), title: "제목3", content: "내용3", author: "작성자3" },
  { id: nanoid(), title: "제목4", content: "내용4", author: "작성자4" },
];

export const useItems = () => {
  const [items, setItems] = useState(() => {
    const itemsFromStorage =
      JSON.parse(localStorage.getItem("items")) || initialItems;
    return itemsFromStorage;
  });

  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const addItem = (newItem) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems, newItem];
      updateLocalStorage(updatedItems);
      return updatedItems;
    });
    updateLocalStorage([...items, newItem]);
  };

  const updateItem = (id, updatedItem) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      );
      updateLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const deleteItem = (id) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      updateLocalStorage(updatedItems);
      return updatedItems;
    });
  };
  const getItems = () => {
    return items;
  };
  return { items, addItem, updateItem, deleteItem, getItems };
};
