// src/redux/modules/counter.js
//초기상태값
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todolist: [],
  isLoading: false,
  error: null,
};

export const __getTodos = createAsyncThunk(
  "todosSlice/getTodos",
  async (payload, thunkAPI) => {
    try {
      const getData = await axios.get("http://localhost:3001/posts");
      return getData.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __postTodos = createAsyncThunk(
  "postTodos",
  async (payload, thunkAPI) => {
    try {
      const postData = await axios.post("http://localhost:3001/posts", payload);
      //   console.log(getData);
      return thunkAPI.fulfillWithValue(postData.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __patchTodos = createAsyncThunk(
  "patchTodos",
  async (payload, thunkAPI) => {
    const { id, title, body } = payload;
    try {
      const patchData = await axios.patch(`http://localhost:3001/posts/${id}`, {
        title,
        body,
      });
      console.log(patchData);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __delTodos = createAsyncThunk(
  "delTodos",
  async (payload, thunkAPI) => {
    try {
      const delData = await axios.delete(
        `http://localhost:3001/posts/${payload.id}`
      );
      console.log(delData);
      return thunkAPI.fulfillWithValue(delData.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//리듀서
export const todosSlice = createSlice({
  name: "sliceTodo",
  initialState,
  reducers: {},
  // addTodo: (state, action) => {
  //   state.todolist = [...state.todolist, action.payload];
  // },
  // delTodo: (state, action) => {
  //   state.todolist = state.todolist.filter(
  //     (value) => value.id !== action.payload
  //   );
  // },
  // updateTodo: (state, action) => {
  //   console.log(state);
  //   state.todolist = state.todolist.map((value) =>
  //     value.id === action.payload
  //       ? { ...value, isDone: !value.isDone }
  //       : value
  //   );
  // },
  extraReducers: {
    [__getTodos.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.todolist = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    [__getTodos.rejected]: (state, action) => {
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    [__postTodos.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postTodos.fulfilled]: (state, action) => {
      state.todolist = [...state.todolist, action.payload]; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      //   console.log("pt", action.payload);
    },
    [__postTodos.rejected]: (state, action) => {
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    [__patchTodos.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__patchTodos.fulfilled]: (state, action) => {
      const newTodos = [...state.todolist];
      state.todolist = newTodos.map((todo) => {
        if (todo.id === parseInt(action.payload.id)) {
          return {
            ...todo,
            title: action.payload.title,
            body: action.payload.body,
          };
        } else {
          return todo;
        }
      });
      console.log(action.payload.id);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    [__patchTodos.rejected]: (state, action) => {
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    [__delTodos.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__delTodos.fulfilled]: (state, action) => {
      state.todolist = state.todolist.filter(
        (data) => data.id !== action.payload
      );
      // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    [__delTodos.rejected]: (state, action) => {
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    },
  },
});
export const {
  //   addTodo,
  //   delTodo,
  //   updateTodo,
  getData,
  postData,
  putData,
  delData,
} = todosSlice.actions;
export default todosSlice.reducer;

// // Action Value
// const Add_TODO = "ADD_TODO";
// const DEL_TODO = "DEL_TODO";
// const UPDATE_TODO = "UPDATE_TODO";

// // Action Creator

// export const addTodo = (payload) => {
//   return {
//     type: Add_TODO,
//     payload,
//   };
// };
// export const delTodo = (payload) => {
//   return {
//     type: DEL_TODO,
//     payload,
//   };
// };
// export const updateTodo = (payload) => {
//   return {
//     type: UPDATE_TODO,
//     payload,
//   };
// };

// // Initial State
// const initialstate = [];
// // Reducer

// const todo = (state = initialstate, action) => {
//   switch (action.type) {
//     case Add_TODO:
//       return [...state, action.payload];
//     case DEL_TODO:
//       const newData = state.filter((value) => {
//         return value.id !== action.payload;
//       });
//       return newData;

//     case UPDATE_TODO:
//       const newDatas = state.map((value) => {
//         return value.id === action.payload
//           ? { ...value, isDone: !value.isDone }
//           : value;
//       });
//       return newDatas;
//     default:
//       return state;
//   }
// };

// export default todo;
