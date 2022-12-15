import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  __getComment,
  __addComment,
  __deleteComment,
  __updateComment,
} from "../modules/commentSlice";

const Comments = () => {
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [bool, setBool] = useState(true);
  const [update, setUpdate] = useState("");
  const dispatch = useDispatch();

  const commentArr = useSelector((state) => state.comment.comments);

  const updateOnClickHandler = (uniId, afCom) => {
    console.log("update:");
    dispatch(__updateComment({ before: uniId, after: afCom }));
  };
  useEffect(() => {
    dispatch(__getComment());
  }, [dispatch]);

  const addOnClickHandler = (e) => {
    e.preventDefault();
    dispatch(__addComment({ comment: input, comentid: id }));
  };

  const deleteOnClickHandler = (id, cmt) => {
    dispatch(__deleteComment({ argId: id, argCt: cmt }));
  };

  return (
    <DetailBox>
      <div>
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="댓글기능"
          />
          <button onClick={addOnClickHandler}>등록</button>
        </form>
        {commentArr?.map((items) => {
          return (
            <Wrapper key={items.id}>
              {bool ? (
                <div>{items?.comment}</div>
              ) : (
                <textarea
                  value={update}
                  onChange={(e) => {
                    setUpdate(e.target.value);
                  }}
                />
              )}

              <div>
                {bool ? (
                  <>
                    <button onClick={() => setBool(false)}>수정</button>
                    <button
                      onClick={() => deleteOnClickHandler(items.id, commentArr)}
                    >
                      삭제
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => updateOnClickHandler(items.id, update)}
                    >
                      완료
                    </button>
                    <button onClick={() => setBool(true)}>취소</button>
                  </>
                )}
              </div>
            </Wrapper>
          );
        })}
      </div>
    </DetailBox>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const DetailBox = styled.div`
  background-color: white;
  width: 600px;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(6px + 2vmin);
  color: #282c34;
  border-radius: 10px;
  margin: 100px auto;
`;
const ButtonStyle = styled.button`
  border: #ff7800;
  border-radius: 100px;
  width: 88px;
  font-size: 14px;
  font-weight: 800;
  padding: 5px;
  margin-right: 8px;
  margin-top: 36px;
`;
export default Comments;
