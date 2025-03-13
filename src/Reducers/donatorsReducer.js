import * as A from '../Constants/actions'

export default function donatorsReducer(state, action) {
    let newState
    switch (action.type) {

        case A.LOAD_DONATORS_FROM_SERVER:
            newState = action.payload;
            break;


        default: newState = state;
    }

    return newState;
}