import React from "react";
import "./stylesPagination.css";

export function  Pagination({currentPageNumber, totalPageNumber, clickedPage}) {
    let totalPages = totalPageNumber.slice();
return (
    <ul className="pagination">
        <li className={currentPageNumber === 1 ? 'disabled' : ''}><span onClick={()=>{clickedPage(1)}}>&laquo;</span></li>
        <li className={currentPageNumber === 1 ? 'disabled' : ''}><span onClick={()=>{clickedPage(currentPageNumber - 1)}}>&lt;</span></li>
        {totalPages.map((number) =>  <li key={number}><span onClick={() => clickedPage(number)}>{number}</span></li>)}
        <li className={currentPageNumber === totalPages.length ? 'disabled' : ''}><span onClick={() => {clickedPage(currentPageNumber + 1)}}>&gt;</span></li>
        <li className={currentPageNumber === totalPages.length ? 'disabled' : ''}><span onClick={() => {clickedPage(totalPages.length)}}>&raquo;</span></li>
    </ul>
)
}