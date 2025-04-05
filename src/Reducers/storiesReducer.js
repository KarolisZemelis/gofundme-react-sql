import * as A from '../Constants/actions'

export default function storiesReducer(state, action) {
    let newState
    switch (action.type) {

        case A.LOAD_STORIES_FROM_SERVER:
            newState = action.payload;
            break;
        case A.UPDATE_STORIES:
            newState = state.map(story => {
                if (story.id === action.payload.story_id) {
                    return {
                        ...story,
                        collected_amount: story.collected_amount + action.payload.donation_amount,
                        remaining_amount: story.request_amount - (story.collected_amount + action.payload.donation_amount),
                    };
                } else {
                    story
                }
                return story;
            });
            break;


        default: newState = state;
    }

    return newState;
}