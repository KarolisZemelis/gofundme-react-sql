import * as A from '../Constants/actions'

export default function storiesReducer(state, action) {
    let newState
    switch (action.type) {

        case A.LOAD_STORIES_FROM_SERVER:
            newState = action.payload;
            break;


        default: newState = state;
    }

    return newState;
}