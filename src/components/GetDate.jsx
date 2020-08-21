import React from "react";

export function GetDate({fetchedDate}) {
    if(fetchedDate){
    let dateOfCreation = fetchedDate.split("T");
    let reversedDate = dateOfCreation[0].split("-").reverse();
    let timeOfCreation = (dateOfCreation[1].split("."))[0];
    let formattedDate = `${reversedDate[0]}-${reversedDate[1]}-${reversedDate[2]} ${timeOfCreation}`;

return(
    <td className="date-column">{formattedDate}</td>
    )
    }
    else {
        return (
            <td className="date-column"> </td>
        )
    }
}