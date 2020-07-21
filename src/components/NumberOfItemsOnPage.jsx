import React from "react";
import "./stylesNumberOfItems.css";

export function NumberOfItemsOnPage({selectNumberOfItems}) {
return (
    <div className="number-of-items">
        <p>Количество строк на странице:</p>
        <select onChange={(e) => selectNumberOfItems(e.target.value)}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
        </select>
    </div>
)
}