import * as A from "../Constants/actions";

export default function donatorsReducer(state, action) {
    let newState;
    switch (action.type) {
        case A.LOAD_DONATORS_FROM_SERVER:
            console.log('donators updated:', action.payload);
            return [...action.payload];

        case A.LOAD_DONATIONS_FROM_SERVER:
            console.log('donations updated:', action.payload);
            return [...action.payload];

        default:
            newState = state;
    }
    return newState;
}