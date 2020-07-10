
const initialState = {
    items: [],
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_SUBTABLE_ITEMS":
            let newItems = state.items.slice().filter(item => item.fileId !== action.items[0].fileId);
            return {...state, items: [...newItems, ...action.items] };
        default:
            return state;
    }
};