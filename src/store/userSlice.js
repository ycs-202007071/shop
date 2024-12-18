import { createSlice } from "@reduxjs/toolkit";


let user = createSlice({//useState 역할
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
      changName(state){
        state.name = 'park';
      },
      increase(state, actions){
        state.age += actions.payload;
      }
    }
  })
  
  export let {changName, increase} = user.actions

  export default user;