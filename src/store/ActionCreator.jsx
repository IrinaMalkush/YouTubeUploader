import {SubTableUrl} from "../components/Url";

export const CHANGE_SUBTABLE_ITEMS = "CHANGE_SUBTABLE_ITEMS";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_UNDONE: 'SHOW_UNDONE'
}

function itemsHasFetched(items) {
    return {
        type: CHANGE_SUBTABLE_ITEMS,
        items
    };
}

export function filterHasSet(filter) {
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    };
}

export function makeRequestToServer(id) {
    return async (dispatch) => {
        let responseSubTable = await fetch(SubTableUrl + id);
        const dataSubTable = await responseSubTable.json();
        dispatch(itemsHasFetched(dataSubTable));
    };
}
