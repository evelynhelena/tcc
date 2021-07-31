import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from "date-fns/locale";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


function DatePicker(props) {
    const [date, setDate] = useState(props.date);

    const handleDateChange = (date) => {
        setDate(date);
    };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR} className="mt-0">
            <Grid container justify="space-around">
              <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              format="dd/MM/yyyy"
              value={date}
              onChange={handleDateChange}
              className="mt-0 pr-3"
              cancelLabel="Cencelar"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
    )
}

export default DatePicker
