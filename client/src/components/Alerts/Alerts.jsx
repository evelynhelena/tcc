import React from "react";
import Alert from "@material-ui/lab/Alert";
import "./Alerts.css";
function Alerts(props) {
  const visible = props.visible;
  return (
    <>
      {visible ? (
        <Alert severity={props.type} className="alert-posision">
          {props.title}
        </Alert>
      ) : (
        ""
      )}
    </>
  );
}

export default Alerts;
