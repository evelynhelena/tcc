import React from "react";
import "./CardDashboard.css";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
const CardDashboard = (props) => {
  return (
    <div className="card-principal">
      <div className={`card-icon ${props.color}`}>
        {props.icon}
        <Tooltip title={props.titleTooltip}>
          <Link className="link-card-dash" to={`${props.link}`}>
            <OpenInNewIcon/>
          </Link>
        </Tooltip>
      </div>
      <div className="text-right">
        <div className="d-flex flex-column">
          <small className="text-small-card-dashboard">{props.title}</small>
          <p className="m-0 font-info-card">{props.info}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDashboard;
