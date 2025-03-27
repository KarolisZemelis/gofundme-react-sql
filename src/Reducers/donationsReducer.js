import * as A from "../Constants/actions";

export default function donatorsReducer(state, action) {
    let newState;
    switch (action.type) {
        case A.LOAD_DONATIONS_FROM_SERVER:
            // Ensure you're returning a new array
            newState = [...action.payload];  // This ensures it's a new reference
            break;
        default:
            newState = state;
    }
    return newState;
}