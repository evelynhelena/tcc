import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { Dropdown } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from "date-fns/locale";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  let localize = {
    ptBR
  }

  return (
    <>
      <div className="Warrper-nav">
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="d-flex">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR} className="mt-0">
            <Grid container justify="space-around">
              <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              className="mt-0 pr-3"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
           
          </MuiPickersUtilsProvider>
            <Dropdown className="pr-3">
              <Dropdown.Toggle className="button-header" id="dropdown-basic">
                <div className='circle-alert'><span>3</span></div>
                <FaIcons.FaBell />
              </Dropdown.Toggle>

              <Dropdown.Menu className="pl-2 pr-2">
                <Dropdown.Item href="#/action-1">Boleto Atrasado</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Alguns Produtos estão acabando</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Evelyn Pagou a conta de R$500,00</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle className="button-header" id="dropdown-basic">
                <FaIcons.FaUser />
              </Dropdown.Toggle>

              <Dropdown.Menu className="pl-2 pr-2">
                <Dropdown.Item href="#/action-1">Perfil</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Configurações</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-3">Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <IconContext.Provider value={{ color: "fff" }}>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="item-nav">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </IconContext.Provider>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
