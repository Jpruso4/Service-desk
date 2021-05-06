import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Table } from 'reactstrap';

class IncidentesScreen extends Component {
    state = {
        incidentes: null
    }

    componentDidMount() {
        //fetch or axios
        axios.get('http://localhost:8080/incidentes' )
            .then(response => {
                console.log(response.data);
                this.setState({
                    incidentes: response.data
                });
            })
            .catch(error => console.error(error));
    }

    render() {
        let incidentes;

        if (this.state.incidentes === null) {
            incidentes = [];
        } else {
            incidentes = this.state.incidentes;
        }

        let incidentesTags =
            incidentes
                .map((incidente) => (<tr key={incidente.idIncidente}><td>{incidente.idIncidente}</td>
                    <td>{incidente.fecha}</td>
                    <td>{incidente.usuario.numeroDocumento}</td>
                    <td>{incidente.usuario.correo}</td>
                    <td>{incidente.maquina.numeroComputador}</td>
                    <td>{incidente.maquina.numeroDependencia}</td>
                    <td>{incidente.maquina.bloqueDependencia}</td>
                    <td>{incidente.tecnico.nombres}</td>
                    <td>{incidente.tipoIncidente.nombreTipoIncidente}</td>
                    <td>{incidente.estado}</td></tr>));
        return (
            <div>
                <br></br>
                <h1 align="center">Incidentes</h1>
                <br></br>
                <Table striped hover bordered >
                    <tr align="center" textAlign="center">
                        <th >Id</th>
                        <th>Fecha</th>
                        <th>Documento de Usuario</th>
                        <th>Correo de Usuario</th>
                        <th>Número de Computador</th>
                        <th>Número de Salon</th>
                        <th>Bloque de Dependencia</th>
                        <th>Tecnico</th>
                        <th>Tipo de Incidente</th>
                        <th>Estado</th>
                    </tr>
                    <tbody align="center" textAlign="center">
                        {incidentesTags}
                    </tbody>
                </Table>
            </div>
        );
    }

}

export default IncidentesScreen;