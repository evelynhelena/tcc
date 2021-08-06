import React from "react";
import { Container } from "react-bootstrap";
import CalendarComponent from "../../components/Calendar/Calendar";
import Navbar from "../../components/NavBar/Navbar";
function CalenderPage() {
  return (
    <>
    <Navbar/>
    <div className="content">
      <Container>
        <CalendarComponent></CalendarComponent>
      </Container>
    </div>
    </>
  );
}

export default CalenderPage;
