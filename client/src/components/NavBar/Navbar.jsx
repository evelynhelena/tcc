import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { Dropdown } from "react-bootstrap";
import DatePicker from "../DatePicker/DatePicker";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const [date, setDate] = useState(new Date());

  const [menuAlert, setMenuAlert] = React.useState(null);
  const [menuPerfil, setMenuPerfil] = React.useState(null);


  const handleClickAlert = (event) => {
    setMenuAlert(event.currentTarget);
  };
  const handleClickPerfil = (event) => {
    setMenuPerfil(event.currentTarget);
  };

  const handleCloseAlert = () => {
    setMenuAlert(null);
  };

  const handleClosePerfil = () => {
    setMenuPerfil(null);
  };

  return (
    <>
      <div className="Warrper-nav">
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="d-flex">
            <DatePicker date={date} />
            <Button
              className="min-width-button-header"
              aria-controls="menuAlert"
              aria-haspopup="true"
              onClick={handleClickAlert}
            >
              <div className="circle-alert">
                <span>3</span>
              </div>
              <FaIcons.FaBell className="icon-header" />
            </Button>
            <Menu
              id="menuAlert"
              anchorEl={menuAlert}
              keepMounted
              open={Boolean(menuAlert)}
              onClose={handleCloseAlert}
            >
              <MenuItem onClick={handleCloseAlert}><span>Produto Proximos do vencimento</span></MenuItem>
              <MenuItem onClick={handleCloseAlert}>Produto Proximos do vencimento</MenuItem>
              <MenuItem onClick={handleCloseAlert}>Produto Proximos do vencimento</MenuItem>
            </Menu>

            <Button
              className="min-width-button-header"
              aria-controls="menuPerfil"
              aria-haspopup="true"
              onClick={handleClickPerfil}
            >
              <FaIcons.FaUser className="icon-header" />
            </Button>
            <Menu
              id="menuPerfil"
              anchorEl={menuPerfil}
              keepMounted
              open={Boolean(menuPerfil)}
              onClose={handleClosePerfil}
            >
              <MenuItem onClick={handleClosePerfil}>Perfil</MenuItem>
              <MenuItem onClick={handleClosePerfil}>Configurações</MenuItem>
              <MenuItem onClick={handleClosePerfil}>Sair</MenuItem>
            </Menu>
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
