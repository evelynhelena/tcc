import React from 'react';
import "./CardDashboard.css";
const CardDashboard = (props) => {
    return (
        <div className="card-principal">
            <div className= {`card-icon ${props.color}`}>
                {props.icon}
            </div>
            <div className="text-right">
                <div className="d-flex flex-column">
                    <small className='text-small-card-dashboard'>{props.title}</small>
                    <p className="m-0 font-info-card">{props.info}</p>
                </div>
            </div>
        </div> 
    );
}

export default CardDashboard;
