import React from "react";

function Erroring({status, msg}) {
    return <p>{status}: {msg}</p>
}
 
export default Erroring;