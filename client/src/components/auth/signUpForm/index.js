import React, { Component } from 'react'

import AuthService from './../../../service/authService'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            myError:false,
            err:undefined
        }
        this.AuthService = new AuthService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    

    handleFormSubmit = e => {
        e.preventDefault()
        this.AuthService
            .signup(this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push('/home')
            })
            .catch((error) => this.setState({myError:true,err : error.response.data.message})   // Error handling yay!
                )}

    render() {
        return (
            <Container as="main" className="mt-5 text-white">

                <Row>
                    <Col md={{ offset: 3, span: 6 }}>
                        <h3 className="text-white text-center">Registro de usuario</h3>

                        <hr className="hr-secondary"></hr>

                        <Form onSubmit={this.handleFormSubmit}>

                            <Form.Group>
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                                <Form.Text className="text-muted">Mínimo tres caracteres</Form.Text>
                            </Form.Group>

                            {this.state.myError ?  <div className="error"><h6>{this.state.err}</h6></div> : null}

                            <button className="botton" id="start-button"> <span>Regístrate</span></button>
                        </Form>

                    </Col>
                </Row>


            </Container>
        )
    }
}

export default SignupForm