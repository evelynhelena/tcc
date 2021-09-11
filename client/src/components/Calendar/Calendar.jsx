import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Modal, Button, Col, Row } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import ViewDayIcon from "@material-ui/icons/ViewDay";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import MenuItem from "@material-ui/core/MenuItem";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ViewListIcon from '@material-ui/icons/ViewList';
import TodayIcon from '@material-ui/icons/Today';
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
  let allViews = ["month", "week", "day", "work_week","agenda"];
  const [importanceList, setImportanceList] = useState([]);
  const [idEvent, setIdEvent] = useState("");

  const [title, setTitle] = useState("");
  const [localeEvent, setLocaleEvent] = useState("");
  const [note, setNote] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [updateEvent, setUpdate] = useState(false);
  const config = {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
  };
  //</variable>


  //<functions>
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resetaCampos = () => {
    setImportance("");
    setTitle("");
    setLocaleEvent("");
    setNote("");
    setIdEvent("");
    setEnviado(false);
    setUpdate(false);
  };

  const getInportanceTasks = async () => {
    try {
      const { data } = await api.get(`${server.url}inportanceTasks`,config);
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
      const { data } = await api.post(`${server.url}event/`, newEvent,config);
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

  const updateEventFunction = async (event) => {
    try {
      const { data } = await api.put(`${server.url}event/${idEvent}`, event,config);
      if (data) {
        swal("Sucesso", "Evento editado com sucesso", "success");
        getEvent();
        setShow(false);
        resetaCampos();
      }
    } catch (err) {
      swal("Erro", "Erro ao editar o usuário", "error");
    }
  };

  const deleteEvent = function () {
    swal({
      title: "Confermar Alteração !",
      text: "Deseja deletar este evento",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api.delete(`${server.url}event/${idEvent}`,config).then(function (response) {
          let data = response.data;
          if (data.msg) {
            swal("Usuário deletado com sucesso", {
              icon: "success",
            });
            getEvent();
            setShow(false);
            resetaCampos();
          } else if (data.error.status === 500) {
            swal("Evento não cadastrado", {
              icon: "error",
            });
            getEvent();
            setShow(false);
            resetaCampos();
          } else {
            swal("Erro ao deletar o evento", {
              icon: "error",
            });
          }
        });
      }
    });
  };

  const getEvent = async () => {
    try {
      const { data } = await api.get(`${server.url}event`,config);
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
    setIdEvent(event.objEvent.idEvent);
    setShow(true);
    setUpdate(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    setDtInit(new Date(start));
    setDtEnd(new Date(end));
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
      if (
        (null === value || value === undefined || value.length === 0) &&
        key !== "place"
      ) {
        allInsert = false;
      }
    }
    if (allInsert) {
      return newEvent;
    } else {
      return false;
    }
  };

  const saveEvent = (insert) => {
    setEnviado(true);
    let newEvent = validaCampos();
    if (newEvent) {
      if (insert) {
        inserEvent(newEvent);
      } else {
        updateEventFunction(newEvent);
      }
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
          next: (
            <Tooltip title="Depois">
              <ChevronRightIcon />
            </Tooltip>
          ),
          today: (
            <Tooltip title="Hoje">
              <TodayIcon />
            </Tooltip>
          ),

          previous: (
            <Tooltip title="Antes">
              <ChevronLeftIcon />
            </Tooltip>
          ),

          month: (
            <Tooltip title="Mês">
              <ViewComfyIcon />
            </Tooltip>
          ),
          week: (
            <Tooltip title="Semana">
              <ViewWeekIcon />
            </Tooltip>
          ),

          work_week: (
            <Tooltip title="Dias da Letivos">
              <ViewCompactIcon />
            </Tooltip>
          ),
          day: (
            <Tooltip title="Dia">
              <ViewDayIcon />
            </Tooltip>
          ),
          agenda:(
            <Tooltip title="Agenda">
              <ViewListIcon />
            </Tooltip>
          ),
          showMore: function showMore(total) {
            return " Mais " + total + "+";
          },
          date: "Data",
          time: "Hora",
          event: "Evento",
          noEventsInRange:'Nenhum Evento Encontrado',

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

          {updateEvent ? (
            <div className="bt-delete-event">
              <Tooltip title="Deletar">
                <IconButton
                  color="secondary"
                  aria-label="Deletar"
                  onClick={deleteEvent}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            ""
          )}

          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="info"
            className="float-right"
            onClick={() => (updateEvent ? saveEvent(false) : saveEvent(true))}
          >
            {updateEvent ? "Editar" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CalendarComponent;
