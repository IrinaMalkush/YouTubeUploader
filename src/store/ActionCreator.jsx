import {SubTableUrl} from "../components/Url";

function itemsHasFetched(items) {
    return {
        type: "CHANGE_SUBTABLE_ITEMS",
        items,
    };
}

export function makeRequestToServer(id) {
    return async (dispatch) => {
        let responseSubTable = await fetch(SubTableUrl + id);
        const dataSubTable = await responseSubTable.json();
        dispatch(itemsHasFetched(dataSubTable));
    };
}