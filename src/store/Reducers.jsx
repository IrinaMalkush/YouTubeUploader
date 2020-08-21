import { combineReducers } from "redux";
import { CHANGE_SUBTABLE_ITEMS, SET_VISIBILITY_FILTER, VisibilityFilters } from "./ActionCreator";

const initialState = {
    items: [],
    filter: VisibilityFilters.SHOW_ALL
};

export const loadingDetails = (state = initialState.items, action) => {
    switch (action.type) {
        case CHANGE_SUBTABLE_ITEMS:
            console.log(state.items);
            let newItems = state.items.slice().filter(item => item.fileId !== action.items[0].fileId);
            return {...state, items: [...newItems, ...action.items] };
        default:
            return state;
    }
};

const visibilityFilter = (state = initialState.filter, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

export const reducer = combineReducers({
    items: loadingDetails,
    filter: visibilityFilter
})
