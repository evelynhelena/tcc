import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import "./ErrorPage.css";

function ErrorPage(){
    return (
        <div className="content d-flex justify-content-center align-items-center">
            <div className="wrapper-error-page">
                <Container className="text-center">
                    <Row>
                        <Col xs={12} md={12}>
                            <div className="text-error-page">404</div>
                            <p>Pagina não encontrada</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default ErrorPage;
