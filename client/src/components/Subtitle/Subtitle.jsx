import React from 'react'
import "./Subtitle.css";

function Subtitle(props) {
    return (
        <>
            <h3 className="component-subtitle mb-0">{props.title}</h3>
        </>
    )
}

export default Subtitle
