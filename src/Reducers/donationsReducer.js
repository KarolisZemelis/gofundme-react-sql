import * as A from "../Constants/actions";

export default function donatorsReducer(state, action) {
    let newState;
    switch (action.type) {
        case A.LOAD_DONATORS_FROM_SERVER:
            const allDonations = action.payload;
            const groupedDonations = {};
            allDonations.forEach(donation => {
                const { name, donation_amount } = donation;
                groupedDonations[name] = (groupedDonations[name] || 0) + donation_amount;
            });
            const donatorsArray = Object.entries(groupedDonations).map(([name, total_donated]) => ({
                name,
                total_donated,
            }));
            const topDonators = donatorsArray
                .sort((a, b) => b.total_donated - a.total_donated)
                .slice(0, 10);
            newState = topDonators
            break;

        case A.LOAD_DONATIONS_FROM_SERVER:
            newState = action.payload;
            break;

        case A.UPDATE_DONATORS:
            newState = structuredClone(state);
            const donatorToUpdateIndex = newState.findIndex(d => d.name === action.payload.name);
            if (donatorToUpdateIndex !== -1) {
                newState[donatorToUpdateIndex].total_donated += action.payload.donation_amount;
                newState.sort((a, b) => b.total_donated - a.total_donated)
            } else {
                newState.push({ name: action.payload.name, total_donated: action.payload.donation_amount })
                newState.sort((a, b) => b.total_donated - a.total_donated)
            }

            break;

        default:
            newState = state;
    }
    return newState;
}