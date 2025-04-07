import * as A from '../Constants/actions'

export default function storiesReducer(state, action) {
    let newState
    switch (action.type) {

        case A.LOAD_STORIES_FROM_SERVER:
            newState = action.payload;
            break;
        case A.UPDATE_STORIES_AFTER_DONATION:
            console.log('*******************')
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
        case A.UPDATE_STORIES_AFTER_STATUS:
            newState = state.map(story => {
                if (story.id === action.payload.story_id) {
                    return {
                        ...story,
                        status: action.payload.status === true ? 1 : 0
                    };
                } else {
                    return story;
                }

            });
            break;

        default: newState = state;
    }

    return newState;
}