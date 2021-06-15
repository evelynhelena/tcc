import React from "react";
import ChartistGraphComponenente from "../../components/ChartistGraph/ChartistGraph";
import { Card } from "react-bootstrap";
import "./CardGraphic.css";
function CardGraphic(props) {
  return (
    <Card className="p-3">
      <div className={`${props.color} card-grafic mb-3`}>
        <ChartistGraphComponenente 
            typeGraphic={props.typeGraphic}
            series={props.series}
        />
      </div>
      <Card.Body className="p-0">
        <Card.Text className="card-graphic-text">
          {props.principalTitle}
        </Card.Text>
        <Card.Text 
        className={props.positivo ? "card-graphic-text-small  card-graphic-text-small-positivo" : 
        "card-graphic-text-small  card-graphic-text-small-negativo"}
        >
          {props.infoText}{" "}
          <span>
            {props.value}
            {props.icon}
          </span>
        </Card.Text>
        <hr />
        <Card.Text className="card-graphic-text-realy-small">
          {props.iconFooter}{props.textFooter}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardGraphic;
