import { combineReducers } from "redux";
import { CHANGE_SUBTABLE_ITEMS, SET_VISIBILITY_FILTER, VisibilityFilters } from "./ActionCreator";

const initialState = {
    items: [],
    filter: VisibilityFilters.SHOW_ALL
};

export const loadingDetails = (state = initialState.items, action) => {
    switch (action.type) {
        case CHANGE_SUBTABLE_ITEMS:
            let newItems = state.slice().filter(item => item.fileId !== action.items[0].fileId);
            let newState = [...newItems, ...action.items];
            return newState;
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
