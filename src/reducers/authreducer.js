const authreducer = (state=[], action)=>{
  switch(action.type) {
    case "SET_AUTH_USER":
      sessionStorage.setItem('_u', JSON.stringify(action.userData));
      return state = (action.userData);
    default: return state;
  }
  
}

export default authreducer;