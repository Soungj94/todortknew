import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

const CardWrapper = styled.div`
  border: 3px solid green;
  padding: 5px 10px;
  width: 300px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MyBtn = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid orange;
`;

const CardDeck = ({ data }) => {
  //   const dispatch = useDispatch();
  //   console.log(data);
  //   const delTodoHandler = () => {
  //     dispatch(delTodo(data.id));
  //   };
  //   const UpdateTodoHandler = () => {
  //     dispatch(updateTodo(data.id));
  //   };

  return (
    <>
      <CardWrapper>
        <div>
          <p>{data.title}</p>
          <p>{data.body}</p>
        </div>
        <div>
          {/* <MyBtn onClick={delTodoHandler}>삭제</MyBtn>
          <MyBtn onClick={UpdateTodoHandler}>
            {data.isDone ? "취소" : "완료"}
          </MyBtn> */}
          <Link to={`/${data.id}`}>상세페이지</Link>
        </div>
      </CardWrapper>
    </>
  );
};

export default CardDeck;
