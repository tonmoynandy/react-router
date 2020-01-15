const flashmessagereducer = (state = [], action) => {

    switch (action.type) {
        case "SUCCESS":
            return state = {success:action.message};
        case "ERROR":
            return state = {error:action.message};
        default:
            return state;
    }
    
}
export default flashmessagereducer;