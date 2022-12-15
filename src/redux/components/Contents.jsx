import React from "react";
import CardDeck from "./CardDeck";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { __getTodos } from "../modules/todo";

const Contents = () => {
  const dispatch = useDispatch();
  const { isLoading, error, todolist } = useSelector(
    (state) => state.todosSlice
  );
  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <div>
        <h1>Working</h1>
        {todolist?.map((data) => (
          // !data.isDone &&
          <CardDeck key={`main-todo-${data.id}`} data={data}></CardDeck>
        ))}
      </div>
      {/* <div>
        <h1>Done</h1>
        {todolist.map(
          (data) =>
            data.isDone && (
              <CardDeck key={`main-done-${data.id}`} data={data}></CardDeck>
            )
        )}
      </div> */}
    </>
  );
};
export default Contents;
