import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//db.json에 있는 댓글 조회
export const __getComment = createAsyncThunk(
  "GET_COMMENT", //액션 벨류
  async (arg, thunkAPI) => {
    // console.log("조회 함수작동")
    try {
      // console.log("arg:", arg)
      // console.log("thunkAPI:", thunkAPI)

      const getData = await axios.get(`http://localhost:3001/comments`, arg);
      // console.log("getData:", getData.data)

      return thunkAPI.fulfillWithValue(getData.data);
      //네트워크 요청이 성공한 경우에 dispatch 해주는 tolkitAPI
      //promise 에서 resolve된 경우
    } catch (e) {
      // console.log("e:", e)
      return thunkAPI.rejectWithValue(e);
      //네크워크 요청이 실패한 경우에 dispatch 해주는 tolkitAPI
      //promise에서 reject된 경우
    }
  }
);

//서버에 댓글 추가
export const __addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (arg, thunkAPI) => {
    try {
      // console.log("댓글 추가 합니다")
      // console.log("arg:", arg)
      // console.log("thunkAPI:", thunkAPI)

      // const { data } = await axios.post(`http://localhost:3001/comments:${arg.id}/${arg.comment}`);
      // const addData = await axios.post(`http://localhost:3001/comments`,
      //   { commentId: 0, num: 0, comment: "맞습니다" });
      const addData = await axios.post(`http://localhost:3001/comments`, arg);

      // console.log("addData:", addData.data)
      return thunkAPI.fulfillWithValue(addData.data);
    } catch (e) {
      // console.log("e:", e)
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//서버에 댓글 삭제
export const __deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      // console.log("arg:", arg)

      // console.log("thunkAPI:", thunkAPI)
      // const data = await axios.delete(`http://localhost:3001/comments/`, { commentid: a, id: b });
      const data = await axios.delete(
        `http://localhost:3001/comments/${arg.argId}`
      );

      // console.log("data:", data)
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      // console.log("e:", e)
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//서버에 댓글 수정
export const __updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      console.log("arg:", arg);
      const data = { comment: arg.after };
      // console.log("thunkAPI:", thunkAPI)
      // const data = await axios.delete(`http://localhost:3001/comments/`, { commentid: a, id: b });
      const upData = await axios.patch(
        `http://localhost:3001/comments/${arg.before}`,
        data
      );

      console.log("updata:", upData);
      return thunkAPI.fulfillWithValue(upData.data);
    } catch (e) {
      // console.log("e:", e)
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  comments: [
    {
      comment: "",
      commentid: 0,
      id: 0,
    },
  ],
  isLoading: false,
  error: null,
  isGlobalEditmode: false,
};

//리듀서
export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},

  // 화면에 보여줄 댓글중 기본값 for 화면을 나타내기 위함
  //   clearComment: (state) => {
  //     console.log("state:", state)
  //     state.comments = {
  //       comment: '',
  //       commentid: 0,
  //       id: 0
  //     };
  //   }
  // },

  extraReducers: {
    //    <  update  >
    [__updateComment.pending]: (state) => {
      // console.log("state:", state)
      state.isLoading = true;
      // console.log("작동하는중");
      //네트워크 요청(댓글 요청)이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__updateComment.fulfilled]: (state, action) => {
      // console.log("add작동:");
      console.log("action:", action);
      state.comments = state.comments.map((comment) => {
        if (comment.id === action.payload.id) {
          return { ...comment, comment: action.payload.comment };
        } else {
          return comment;
        }
      });

      state.isLoading = false;
      //state에서 값을 가져오고 네트워크 요청이 끝났으니 false로 변경
    },
    [__updateComment.rejected]: (state, action) => {
      console.log("update 에러문:", action.payload);
      state.error = action.payload;
      state.isLoading = true;
      //catch 된 error 객체를 넣고 네트워크 요청이 끝났으니 false
    },

    //    <  delete  >
    [__deleteComment.pending]: (state) => {
      // console.log("state:", state)
      state.isLoading = true;
      // console.log("작동하는중");
      //네트워크 요청(댓글 요청)이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__deleteComment.fulfilled]: (state, action) => {
      // console.log("add작동:");
      // console.log("action:", action)
      //action.payload.argCt=배열
      //action.payload.argId=번호
      const arr = action.payload.argCt;
      const num = action.payload.argId;
      state.comments = arr.filter((items) => num !== items.id);

      state.isLoading = false;
      //state에서 값을 가져오고 네트워크 요청이 끝났으니 false로 변경
    },
    [__deleteComment.rejected]: (state, action) => {
      console.log("delete 에러문:", action.payload);
      state.error = action.payload;
      state.isLoading = true;
      //catch 된 error 객체를 넣고 네트워크 요청이 끝났으니 false
    },

    //   <  add  >
    [__addComment.pending]: (state) => {
      // console.log("state:", state)
      state.isLoading = true;
      // console.log("작동하는중");
      //네트워크 요청(댓글 요청)이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__addComment.fulfilled]: (state, action) => {
      console.log("delete 작동:");
      console.log("payload:", action);
      state.comments = [...state.comments, action.payload];

      state.isLoading = false;
      //state에서 값을 가져오고 네트워크 요청이 끝났으니 false로 변경
    },
    [__addComment.rejected]: (state, action) => {
      console.log("add 에러문:", action.payload);
      state.error = action.payload;
      state.isLoading = true;
      //catch 된 error 객체를 넣고 네트워크 요청이 끝났으니 false
    },

    //            < get >
    // extraReducers: {
    [__getComment.pending]: (state) => {
      state.isLoading = true;
      //네트워크 요청(댓글 요청)이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getComment.fulfilled]: (state, action) => {
      // state.comment = [...state.comment, action.payload];
      state.comments = action.payload;
      // console.log("getPay:", state.comments)
      console.log("payload:", action.payload);
      state.isLoading = false;

      //state에서 값을 가져오고 네트워크 요청이 끝났으니 false로 변경
    },
    [__getComment.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
      //catch 된 error 객체를 넣고 네트워크 요청이 끝났으니 false
    },
  },
});

export const { getData, addData, upData } = commentSlice.actions;
export default commentSlice.reducer;
