import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __delTodos } from "../redux/modules/todo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { __putTodos } from "../redux/modules/todo";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todosSlice.todolist);
  console.log(id);

  const todo = todos.find((item) => {
    return item.id === parseInt(id);
  });
  console.log(todo);

  const { isLoading, error } = useSelector((state) => state.todosSlice);
  const [isEditing, setIsEditing] = useState(false);

  const delClickHandler = () => {
    dispatch(__delTodos({ id }));
    navigate("/");
  };
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };
  const EditClickHandler = () => {
    dispatch(__putTodos({ id }));
  };

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.body}</p>
      <div>
        {isEditing && <input Placeholder="" />}
        <button
          type="button"
          onClick={isEditing ? toggleEditing() : delClickHandler(id)}
        >
          {isEditing ? "취소하기" : "삭제하기"}
        </button>
        <button
          type="button"
          onClick={isEditing ? EditClickHandler(id) : toggleEditing()}
        >
          {isEditing ? "완료하기" : "수정하기"}
        </button>
      </div>
    </div>
  );
};

export default Detail;
