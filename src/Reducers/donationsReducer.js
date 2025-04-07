import * as A from "../Constants/actions";
import { v4 } from "uuid";
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
            newState = structuredClone(state);
            newState = action.payload;
            break;

        case A.UPDATE_DONATIONS:
            newState = structuredClone(state);
            newState = [{ id: v4(), ...action.payload }, ...state];
            break;

        case A.UPDATE_DONATORS:
            newState = structuredClone(state);
            const index = newState.findIndex(d => d.name === action.payload.name);

            if (index !== -1) {
                newState[index].total_donated += action.payload.donation_amount;
            } else {
                newState.push({
                    name: action.payload.name,
                    total_donated: action.payload.donation_amount,
                });
            }

            newState = newState
                .sort((a, b) => b.total_donated - a.total_donated)
                .slice(0, 10);

            break;


        default:
            newState = state;
    }
    return newState;
}