import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Modal, Button, Col, Row } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { HiViewBoards } from "react-icons/hi";
import { HiViewGrid } from "react-icons/hi";
import MenuItem from "@material-ui/core/MenuItem";
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
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import server from "../../Config/BaseURL";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const [events, setEvents] = useState([]);

  const [dtInit, setDtInit] = useState(new Date());
  const [dtEnd, setDtEnd] = useState(new Date());
  const [show, setShow] = useState(false);
  const [importance, setImportance] = useState("");
  let allViews = ["month", "week", "day", "work_week"];
  const [importanceList, setImportanceList] = useState([]);

  const [title, setTitle] = useState("");
  const [localeEvent, setLocaleEvent] = useState("");
  const [note, setNote] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [updateEvent, setUpdate] = useState(false);
  //</variable>

  //<functions>
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resetaCampos = () => {
    setImportance("");
    setTitle("");
    setLocaleEvent("");
    setNote("");
    setEnviado(false);
    setUpdate(false);
  };

  const getInportanceTasks = async () => {
    try {
      const { data } = await api.get(`${server.url}inportanceTasks`);
      if (data) setImportanceList(data);
    } catch (err) {
      swal("Erro", "Erro ao selecionar a inportancia das tarefas", "error");
    }
  };
  useEffect(() => {
    getInportanceTasks();
  }, []);

  const inserEvent = async (newEvent) => {
    try {
      const { data } = await api.post(`${server.url}event/`, newEvent);
      if (data) {
        swal("Sucesso", "Evento inserirdo com sucesso", "success");
        getEvent();
        setShow(false);
        resetaCampos();
      }
    } catch (err) {
      swal("Erro", "Erro ao inserir o usuário", "error");
    }
  };

  const updateEventFunction = () => {
    console.log("ola mundo");
  };

  const getEvent = async () => {
    try {
      const { data } = await api.get(`${server.url}event`);
      if (data) {
        let allEvents = [];
        data.forEach((ev) => {
          allEvents.push({
            objEvent: ev,
            title: ev.title,
            start: new Date(ev.dt_init),
            end: new Date(ev.dt_end),
            color: ev.color_inportance,
          });
        });
        setEvents(allEvents);
        console.log(data);
      }
    } catch (err) {
      swal("Erro", "Erro recuperar os eventos", "error");
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  const handleSelectEvent = (event) => {
    setImportance(event.objEvent.idInportance);
    setTitle(event.objEvent.title);
    setLocaleEvent(event.objEvent.place);
    setNote(event.objEvent.descricao);
    setDtInit(event.objEvent.dt_init);
    setDtEnd(event.objEvent.dt_end);
    setShow(true);
    setUpdate(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    setDtInit(start);
    setDtEnd(start);
    resetaCampos();
    setShow(true);
  };

  const openModalInsert = () => {
    setShow(true);
    setDtInit(new Date());
    setDtEnd(new Date());
    resetaCampos();
    setShow(true);
  };

  const validaCampos = () => {
    let allInsert = true;
    const newEvent = {
      title: title,
      dtInit: dtInit,
      dtEnd: dtEnd,
      place: localeEvent,
      descricao: note,
      inportance: importance,
    };

    for (var [key, value] of Object.entries(newEvent)) {
      if (null === value) {
        allInsert = false;
      }
    }
    if (allInsert) {
      return newEvent;
    } else {
      return false;
    }
  };

  const saveEvent = () => {
    setEnviado(true);
    let newEvent = validaCampos();
    if (newEvent) {
      inserEvent(newEvent);
    }
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
        onClick={openModalInsert}
      >
        Add Evento
      </ButtonMaterial>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={allViews}
        onSelectEvent={(event) => handleSelectEvent(event)}
        onSelectSlot={(e) => handleSelectSlot(e)}
        style={{ height: 550 }}
        eventPropGetter={eventStyleGetter}
        selectable={true}
        messages={{
          next: <FaIcons.FaAngleRight title="Proximo" />,
          today: <FaIcons.FaCalendarAlt title="Hoje" />,
          previous: <FaIcons.FaAngleLeft title="Antes" />,
          month: (
            <Tooltip title="Mês">
              <IconButton aria-label="Deletar">
                <ViewComfyIcon />
              </IconButton>
            </Tooltip>
          ),
          week: <HiViewBoards title="Semana" />,
          work_week: <HiViewList title="Dias da Letivos" />,
          day: <HiViewGridAdd title="Dia" />,
          showMore: function showMore(total) {
            return " Mais " + total + "+";
          },
        }}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="font-header-add-event">
            {updateEvent ? "Editando Evento" : "Add Novo Evento"}
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
                    value={dtInit}
                    format="dd/MM/yyyy - HH:mm"
                    onChange={setDtInit}
                    label="Início*"
                    className="width-date-time-picker"
                    cancelLabel="Cencelar"
                    ampm={false}
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
                    value={dtEnd}
                    format="dd/MM/yyyy - HH:mm"
                    onChange={setDtEnd}
                    label="Fim*"
                    className="width-date-time-picker"
                    cancelLabel="Cencelar"
                    ampm={false}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} md={12}>
              <TextField
                id="localeEvent"
                label="Local"
                value={localeEvent}
                className="col-md-12"
                onChange={({ target }) => setLocaleEvent(target.value)}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} md={12}>
              <TextField
                id="note"
                label="Descrição*"
                value={note}
                className="col-md-12"
                error={note.length === 0 && enviado}
                onChange={({ target }) => setNote(target.value)}
              />
              {note.length === 0 && enviado ? (
                <VerifyInputs value="Descrição"></VerifyInputs>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} md={12}>
              <TextField
                id="importance"
                select
                label="Inportancia*"
                value={importance}
                error={importance.length === 0 && enviado}
                className="col-md-12"
                onChange={({ target }) => setImportance(target.value)}
              >
                {importanceList.map((impotanceElement) => (
                  <MenuItem
                    key={impotanceElement.idInportance}
                    value={impotanceElement.idInportance}
                  >
                    {impotanceElement.nom_inportance}
                    <span
                      className="style-list-inportance-event"
                      style={{
                        backgroundColor: impotanceElement.color_inportance,
                      }}
                    ></span>
                  </MenuItem>
                ))}
              </TextField>
              {importance.length === 0 && enviado ? (
                <VerifyInputs value="Inportancia"></VerifyInputs>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Tooltip title="Deletar">
            <IconButton color="secondary" aria-label="Deletar">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="info"
            className="float-right"
            onClick={() => (updateEvent ? updateEventFunction() : saveEvent())}
          >
            {updateEvent ? "Editar" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CalendarComponent;
