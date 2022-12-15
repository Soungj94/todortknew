import styled from "styled-components";
// import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { __postTodos } from "../modules/todo";

const FormBox = styled.form`
  width: 1200px;
  height: 50px;
  border: 1px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-top: 10px;
`;

const InputForm = () => {
  const dispatch = useDispatch();
  // const [title, setTitle] = useState("");
  // const [contents, SetContents] = useState("");

  // const getTitleHandler = (event) => {
  //   setTitle(event.target.value);
  // };
  // const getContentsHandler = (event) => {
  //   SetContents(event.target.value);
  // };
  // const onClickHandler = (event) => {
  //   event.preventDefault();
  //   const payload = {
  //     id: Math.floor(Math.random() * 10000),
  //     title,
  //     contents,
  //     isDone: false,
  //   };
  //   dispatch(addTodo(payload));
  const [input, setInput] = useState({ title: "", body: "" });
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  // const [todos, setTodos] = useState(null);

  // patch에서 사용할 id, 수정값의 state를 추가
  // const [targetId, setTargetId] = useState(null);
  // const [editTodo, setEditTodo] = useState({
  //   title: "",
  // });

  // const fetchTodos = async () => {
  //   const { data } = await axios.get("http://localhost:3001/posts");
  //   setTodos(data);
  // };
  useEffect(() => {}, [dispatch]);

  const onClickHandler = (e) => {
    e.preventDefault();
    dispatch(__postTodos(input));
    // setInput([...todos, input]);
  };

  return (
    <>
      <FormBox>
        <input onChange={inputHandler} type="text" name="title"></input>
        <input onChange={inputHandler} type-="text" name="body"></input>
        <button type="submit" onClick={onClickHandler}>
          추가하기
        </button>
      </FormBox>
    </>
  );
};

export default InputForm;
