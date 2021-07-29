import React from 'react'
import "./VerifyInputs.css";
function VerifyInputs(props) {
    return (
        <>
             <div className="mt-1 text-danger font-verify-input">{props.value} é obrigatório</div>
        </>
    )
}

export default VerifyInputs
