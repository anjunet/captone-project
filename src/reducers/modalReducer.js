const initialState = {openClose: "closed", content: ""};
const OPEN_MODAL = 'OPEN_MODAL';

export const modalReducer = (state = initialState, action) => {
    if(action.type === OPEN_MODAL) {
        return action.payload;
    }
    return state;
};


