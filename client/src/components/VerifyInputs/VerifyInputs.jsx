import React from 'react'
import "./VerifyInputs.css";
function VerifyInputs(props) {
    return (
        <>
             <div className="text-danger font-verify-input">{props.value} é obrigatório</div>
        </>
    )
}

export default VerifyInputs
