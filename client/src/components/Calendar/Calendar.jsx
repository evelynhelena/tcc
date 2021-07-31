import React, { useState, Fragment } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Modal, Button, Col, Row } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { HiViewBoards } from "react-icons/hi";
import { HiViewGrid } from "react-icons/hi";
import { HiViewGridAdd } from "react-icons/hi";
import { HiViewList } from "react-icons/hi";
import * as FaIcons from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import VerifyInputs from "../../components/VerifyInputs/VerifyInputs";
import ButtonMaterial from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import { ptBR } from "date-fns/locale";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import "moment/locale/pt-br";
import "./Calendar.css";
const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let allViews = ["month", "week", "day", "work_week"];

  let teste = [
    {
      title: "All Day Event very long title",
      allDay: true,
      start: new Date(2021, 7, 0),
      end: new Date(2021, 7, 1),
      color: "red",
    },
    {
      title: "Long Event",
      start: new Date(2021, 7, 7),
      end: new Date(2021, 7, 10),
    },
  ];

  const teste2 = (titulo) => {
    console.log("ola mundo");
    console.log(titulo);
  };

  const handleSelectSlot = ({ start, end, resourceId }) => {
    console.log(start);
  };

  const saveEvent = () => {
    setEnviado(true);
  };
  const eventStyleGetter = (event, start, end, isSelected) => {
    return {
      style: { backgroundColor: event.color },
    };
  };

  return (
    <div className="wrappe-calendar">
      <ButtonMaterial
        variant="contained"
        className="button-add-event mb-3"
        onClick={handleShow}
      >
        Add Evento
      </ButtonMaterial>
      <Calendar
        localizer={localizer}
        events={teste}
        startAccessor="start"
        endAccessor="end"
        views={allViews}
        onSelectEvent={(event) => teste2(event)}
        onSelectSlot={(e) => handleSelectSlot(e)}
        style={{ height: 550 }}
        eventPropGetter={eventStyleGetter}
        selectable={true}
        messages={{
          next: <FaIcons.FaAngleRight title="Proximo" />,
          today: <FaIcons.FaCalendarAlt title="Hoje" />,
          previous: <FaIcons.FaAngleLeft title="Antes" />,
          month: <HiViewGrid title="Mês" />,
          week: <HiViewBoards title="Semana" />,
          work_week: <HiViewList title="Dias da Letivos" />,
          day: <HiViewGridAdd title="Dia" />,
        }}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="font-header-add-event">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={12}>
              <TextField
                id="title"
                label="Titulo*"
                value={title}
                error={title.length === 0 && enviado}
                className="col-md-12"
                onChange={({ target }) => setTitle(target.value)}
              />
              {title.length === 0 && enviado ? (
                <VerifyInputs value="Titulo"></VerifyInputs>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={12} md={6}>
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                locale={ptBR}
                className="mt-0"
              >
                <Grid container>
                  <DateTimePicker
                    value={selectedDate}
                    format="dd/MM/yyyy - HH:mm"
                    onChange={handleDateChange}
                    label="Início"
                    showTodayButton
                    className="width-date-time-picker"
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Col>
            <Col xs={12} md={6}>
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                locale={ptBR}
                className="mt-0"
              >
                <Grid container>
                  <DateTimePicker
                    value={selectedDate}
                    format="dd/MM/yyyy - HH:mm"
                    onChange={handleDateChange}
                    label="Fim"
                    showTodayButton
                    className="width-date-time-picker"
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Col>
          </Row>
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" className="float-right" onClick={saveEvent}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CalendarComponent;
