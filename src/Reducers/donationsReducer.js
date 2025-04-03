import * as A from "../Constants/actions";

export default function donatorsReducer(state, action) {
    let newState;
    switch (action.type) {
        case A.LOAD_DONATORS_FROM_SERVER:
            newState = [...action.payload];
            console.log('donators', newState)
            break;

        case A.LOAD_DONATIONS_FROM_SERVER:
            newState = [...action.payload];
            console.log('donations', newState)
            break;

        default:
            newState = state;
    }
    return newState;
}