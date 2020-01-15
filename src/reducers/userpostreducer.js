const userpostreducer = (state=[], action)=>{
  switch(action.type) {
    case "USER_POST": return state.userPosts = (action.userPosts);
    default: return state;

  }
  
}

export default userpostreducer;