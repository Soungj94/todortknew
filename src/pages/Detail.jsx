import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __delTodos } from "../redux/modules/todo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { __patchTodos } from "../redux/modules/todo";
import Comments from "../redux/components/Comments";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todosSlice.todolist);
  console.log("🚀 ~ file: Detail.jsx:14 ~ Detail ~ todos", todos);

  const todo = todos.find((item) => {
    return item.id === parseInt(id);
  });

  const { isLoading, error } = useSelector((state) => state.todosSlice);
  const [isEditing, setIsEditing] = useState(false);

  const [inputChange, setInputChange] = useState({ title: "", body: "" });
  // const inputChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   setInputChange({ ...inputChange, [name]: value });
  // };

  const delClickHandler = () => {
    dispatch(__delTodos({ id }));
    navigate("/");
  };
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };
  const EditClickHandler = () => {
    dispatch(
      __patchTodos({ id, title: inputChange.title, body: inputChange.body })
    );
  };

  // useEffect(() => {
  //   dispatch(__getTodos());
  // }, [dispatch]);

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
        {isEditing && (
          <>
            <input
              onChange={(e) => {
                setInputChange({ ...inputChange, title: e.target.value });
              }}
              type="text"
              placeholder="Title"
            />
            <input
              onChange={(e) => {
                setInputChange({ ...inputChange, body: e.target.value });
              }}
              type="text"
              placeholder="Body"
            />
          </>
        )}
        <button
          type="button"
          onClick={isEditing ? toggleEditing : () => delClickHandler(id)}
        >
          {isEditing ? "취소하기" : "삭제하기"}
        </button>
        <button
          type="button"
          onClick={
            isEditing ? () => EditClickHandler(inputChange) : toggleEditing
          }
        >
          {isEditing ? "완료하기" : "수정하기"}
        </button>
      </div>
      <>
        <Comments />
      </>
    </div>
  );
};

export default Detail;
