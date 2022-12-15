import React from "react";
import InputForm from "../redux/components/InputForm";
import Header from "../redux/components/Header";
import Contents from "../redux/components/Contents";

const TodoList = () => {
  return (
    <>
      <Header></Header>
      <InputForm></InputForm>
      <Contents></Contents>
    </>
  );
};

export default TodoList;
