import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Button } from 'reactstrap';
import swal from 'sweetalert';

class FormularioScreen extends Component {
    state = {
        guardado: false,
        form: {
            fecha: '',
            numeroDocumento: '',
            numeroMaquina: '',
            numeroSalon: '',
            problemaUsuario: '',
            declaracionCallCenter: '',
            tipoIncidente: '',
            nombreTecnico: '',
            numeroDependencia: '',
            bloqueDeDependencia: '',
            tipoDeDependencia: ''
        },
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    mostrarAlerta = () => {
        swal({
            title: "Registrar Incidente",
            text: "Desea registrar un nuevo incidente?",
            icon: "info",
            buttons: ["No", "Sí"]
        }).then(respuesta => {
            if (respuesta) {
                this.peticionPost()
            }
        })

    }

    peticionPost = async () => {
        const model = mapStateToModel(this.state.form);
        axios.post('http://localhost:8080/incidentes', model).then(response => {
            console.log(response.data);
            swal({
                text: "El incidente se ha registrado con éxito",
                icon: "success"
            }).then(respuesta => {
                if (respuesta) {
                    window.location.reload();
                }
            })
        }).catch(error => {
            swal({
                text: "El incidente no se ha podido registrar, por favor revise los campos ingresados",
                icon: "error",
                button: "Aceptar"
            })
            console.log(error.message);
        });
    }

    mostrarAlertaValidacion = (formObject) => {
        swal({
            title: "Validación Usuario",
            text: "Desea validar el documento "+  formObject + " ?" ,
            icon: "info",
            buttons: ["No", "Sí"]
        }).then(respuesta => {
            if (respuesta) {
                this.peticionPostValidarUsuario()
            }
        })

    }

    peticionPostValidarUsuario = async () => {
        const model = mapStateToModel(this.state.form);
        axios.post('http://localhost:8080/incidentes/validarUsuario', model).then(response => {
            console.log(response.data);
            swal({
                text: "El usuario  con cedula: "+  response.data.numeroDocumento +" se encuentra registrado con el correo: " + response.data.correo,
                icon: "success",
                button: "Aceptar"
            })
        }).catch(error => {
            swal({
                text: "El usuario no se encuentra registrado, por favor verifique el documento ingresado",
                icon: "error",
                button: "Aceptar"
            })
            console.log(error.message);
        });
    }

    peticionPostValidarEquipo = async () => {
        const model = mapStateToModel(this.state.form);
        axios.post('http://localhost:8080/incidentes/validarEquipo', model).then(response => {
            console.log(response.data);
            swal({
                text: "El equipo de la dependencia: "+ response.data.tipoDependencia.nombreDependencia + " en el bloque: " + response.data.bloqueDependencia +
                    " en el número de dependencia: " + response.data.numeroDependencia + " se encuentra registrado",
                icon: "success",
                button: "Aceptar"
            })
        }).catch(error => {
            swal({
                text: "El equipo no se encuentra registrado, por favor verifique los datos ingresados",
                icon: "error",
                button: "Aceptar"
            })
            console.log(error.message);
        });
    }

    mostrarAlertaValidarEquipo = () => {
        swal({
            title: "Validar Equipo",
            text: "Desea validar este equipo?",
            icon: "info",
            buttons: ["No", "Sí"]
        }).then(respuesta => {
            if (respuesta) {
                this.peticionPostValidarEquipo()
            }
        })

    }

    render() {
        function MostrarTecnico() {
            document.getElementById("EscojerTecnico").style.display = "block"
            document.getElementById("DeclaracionCallCenter").style.display = "none"
        }
        function MostrarDeclaracion() {
            document.getElementById("DeclaracionCallCenter").style.display = "block"
            document.getElementById("EscojerTecnico").style.display = "none"

        }

        return (
            <div class="container">
                <br>
                </br>
                <h1>Formulario de Incidentes</h1>
                <br />
                <div class="form-group col-md-12">
                    <h6 style={{ color: '#F44336' }}>Los campos marcados con un (*) son obligatorios</h6>
                </div>
                <br />
                <div>
                    <form >
                        <div class="form-row">
                            <div class="form-group col-md-5">
                                <label htmlFor="Fecha">Fecha*</label>
                                <input className="form-control" type="date" name="fecha" id="fecha" placeholder="Ingrese la fecha" onChange={this.handleChange} required />
                            </div>
                            <div class="form-group col-md-5">
                                <label htmlFor="numeroDocumento">Número de Documento*</label>
                                <input autocomplete="off" type="number" className="form-control" name="numeroDocumento" id="numeroDocumento" placeholder="Ingrese el número de documento" onChange={this.handleChange} required />
                            </div>
                            <div class="form-group col-md-2">
                                <br/>
                                <Button color="success" onClick={() => this.mostrarAlertaValidacion(this.state.form.numeroDocumento)} >Validar Usuario</Button>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label htmlFor="tipoDeDependencia">Tipo de Dependencia*</label>
                                <select id="tipoDeDependencia" name="tipoDeDependencia" class="form-control" onChange={this.handleChange} required>
                                    <option disabled selected>Selecione un tipo</option>
                                    <option>Administración</option>
                                    <option>Laboratorio</option>
                                    <option>Aula</option>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                <label htmlFor="bloqueDeDependencia">Bloque de la Dependencia*</label>
                                <input autocomplete="off" type="text" className="form-control" name="bloqueDeDependencia" id="bloqueDeDependencia" placeholder="Ingrese el bloque dea dependencia" onChange={this.handleChange} />
                            </div>
                            <div class="form-group col-md-2">
                                <label htmlFor="numeroDependencia">Numero Dependencia*</label>
                                <input type="number" className="form-control" name="numeroDependencia" id="numeroDependencia" placeholder="Ingrese el número del salon" onChange={this.handleChange} required />
                            </div>
                            <div class="form-group col-md-2">
                                <label htmlFor="numeroMaquina">Número del Equipo*</label>
                                <input autocomplete="off" className="form-control" type="number" name="numeroMaquina" id="numeroMaquina" placeholder="Ingrese el número del computador" onChange={this.handleChange} required />
                            </div>
                            <div class="form-group col-md-2">
                                <br/>
                                <Button color="success" onClick={() => this.mostrarAlertaValidarEquipo()} >Validar Equipo</Button>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label htmlFor="problemaUsuario">Declaración del Usuario*</label>
                                <textarea class="form-control" name="problemaUsuario" id="problemaUsuario" rows="3" onChange={this.handleChange} ></textarea>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label htmlFor="tipoIncidente">Tipo de Incidente*</label>
                                <select id="tipoIncidente" name="tipoIncidente" class="form-control" onChange={this.handleChange} required>
                                    <option disabled selected>Selecione un tipo</option>
                                    <option>Redes - Comunicaciones</option>
                                    <option>Sistemas Operativos</option>
                                    <option>Mantenimiento</option>
                                    <option>Servidores</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label>Solcionado Por Call Center*</label>
                                <br />
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" onClick={() => MostrarDeclaracion()} />
                                    <label class="custom-control-label" for="customRadioInline1">Sí</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" onClick={() => MostrarTecnico()} />
                                    <label class="custom-control-label" for="customRadioInline2">No</label>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <section id="DeclaracionCallCenter" style={{ display: 'none' }}>
                            <div class="form-row">
                                <div class="form-group col-md-12">
                                    <label htmlFor="declaracionCallCenter">Declaración Call Center* </label>
                                    <textarea class="form-control" name="declaracionCallCenter" id="declaracionCallCenter" rows="3" onChange={this.handleChange} required></textarea>
                                </div>
                            </div>
                        </section>
                        <section id="EscojerTecnico" style={{ display: 'none' }}>
                            <div class="form-row">
                                <div class="form-group col-md-12">
                                    <label htmlFor="nombreTecnico">Nombre del Tecnico*</label>
                                    <select id="nombreTecnico" name="nombreTecnico" class="form-control" onChange={this.handleChange}>
                                        <option disabled selected>Selecione una respuesta</option>
                                        <option>Juan Pablo</option>
                                    </select>
                                </div>
                            </div>
                        </section>
                        <div class="container">
                            <Button color="success" onClick={() => this.mostrarAlerta()} >Registrar Incidente</Button>
                        </div>
                        <br />
                    </form>
                </div>
            </div>
        );

    }
}

const mapStateToModel = function (formObject) {
    return {
        fecha: formObject.fecha,
        usuario: {
            numeroDocumento: formObject.numeroDocumento
        },
        maquina: {
            tipoDependencia:{
                nombreDependencia: formObject.tipoDeDependencia,
            },
            bloqueDependencia: formObject.bloqueDeDependencia,
            numeroComputador: formObject.numeroMaquina,
            numeroDependencia: formObject.numeroDependencia
        },
        tecnico: {
            nombres: formObject.nombreTecnico
        },
        tipoIncidente: {
            nombreTipoIncidente: formObject.tipoIncidente
        },
        declaracionCallcenter: formObject.declaracionCallCenter,
        problemaUsuario: formObject.problemaUsuario
    };
}

export default FormularioScreen;