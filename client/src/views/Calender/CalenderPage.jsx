import React from 'react'
import { Container } from 'react-bootstrap'
import CalendarComponent from '../../components/Calendar/Calendar'

function CalenderPage() {
    return (
        <div className="content">
            <Container>
                <CalendarComponent></CalendarComponent>
            </Container>
        </div>
    )
}

export default CalenderPage
