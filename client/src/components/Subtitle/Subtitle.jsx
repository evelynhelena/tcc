import React from 'react'
import "./Subtitle.css";

function Subtitle(props) {
    return (
        <>
            <h3 className="component-subtitle">{props.title}</h3>
            <hr/>
        </>
    )
}

export default Subtitle
