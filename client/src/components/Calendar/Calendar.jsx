import React,{useState} from 'react'
import { Calendar, momentLocalizer} from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'
import { ptBR } from "date-fns/locale";
import 'moment/locale/pt-br'; 
const localizer = momentLocalizer(moment);


function CalendarComponent() {
    const [events , setEvents] = useState([]);
    let allViews = ["month","week","day"]
    

let teste = [
    {
        'title': 'All Day Event very long title',
        'allDay': true,
        'start': new Date(2021, 7, 0),
        'end': new Date(2021, 7, 1)
      },
      {
        'title': 'Long Event',
        'start': new Date(2021, 7, 7),
        'end': new Date(2021, 7, 10)
      },
];

const teste2 = (titulo) =>{
    console.log("ola mundo");
    console.log(titulo);
}
    return (
        <div>
            <Calendar
            localizer={localizer}
            events={teste}
            startAccessor="start"
            endAccessor="end"
            views={allViews}
            onSelectEvent={event => teste2(event.title)}
            onSelectSlot={teste2}
            style={{ height: 500 }}
            messages={{
            next: "Próximo",
            previous: "Antes",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia"
            }}
            />
        </div>
    )
}

export default CalendarComponent
