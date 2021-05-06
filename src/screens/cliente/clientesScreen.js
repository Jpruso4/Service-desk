import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Table, Button, ModalBody, Modal, ModalHeader, ModalFooter } from 'reactstrap';
// TODO: imortar clase que se encarge de consumir los servicios

class ClientesScreen extends Component {

    state={
        clientes: null,
        modalInsertar: false,
        modalEliminar: false,
        form:{
            idTipoDocumento: '',
            numeroDocumento: '',
            primerNombre: '',
            segundoNombre: '',
            primerApellido: '',
            segundoApellido: '',
            direccion: '',
            telefono: '',
            celular: '',
            correo: '',
            tipoModal: ''
        }
    }

    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
    }

    handleChange=async e =>{
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);   
    }

    peticionPost = async()=>{
        const model = mapStateToModel(this.state.form);
        axios.post('http://localhost:8080/clientes', model).then(response=>{
            console.log(response.data);    
            this.modalInsertar();
            this.componentDidMount();
        }).catch(error=>{
            console.log(error.message);
        });

        /*
        const response = await axios.post('http://localhost:8080/clientes', model);
        console.log(response.data);  
        this.modalInsertar();
        this.componentDidMount();
        */

    }

    seleccionarCliente=(cliente)=>{
        this.setState({
          tipoModal: 'actualizar',
          form: {
            idCliente: cliente.idCliente,
            idTipoDocumento: cliente.tipoDocumento.idTipoDocumento,
            numeroDocumento: cliente.numeroDocumento,
            primerNombre: cliente.primerNombre,
            segundoNombre: cliente.segundoNombre,
            primerApellido: cliente.primerApellido,
            segundoApellido: cliente.segundoApellido,
            direccion: cliente.direccion,
            telefono: cliente.telefono,
            celular: cliente.celular,
            correo: cliente.correo
          }
        })
      }

      peticionPut=async()=>{
        const model = mapStateToModel(this.state.form);
        await axios.put('http://localhost:8080/clientes', model).then(response=>{
            this.modalInsertar();
            this.componentDidMount();
        }).catch(error=>{
            console.log(error.message);
        })
      }

      peticionPatch=()=>{
          axios.patch('http://localhost:8080/clientes/'+this.state.form.idCliente).then(response=>{
              this.setState({modalEliminar: false});
              this.componentDidMount();
          }).catch(error=>{
            console.log(error.message);
          })
      }

    componentDidMount() {
        //fetch or axios
        axios.get('http://localhost:8080/clientes')
        .then(response =>{
            console.log(response.data);
            this.setState({
                clientes: response.data
            });  
        })
        .catch(error => console.error(error));
    }
    

render(){
    const {form} = this.state;
    let clientes;

    if (this.state.clientes === null) {
        clientes = [];
    } else {
        clientes = this.state.clientes;
    }

    let clientestags =
        clientes
            .map((cliente) => (<tr key={cliente.idCliente}><td>{cliente.idCliente}</td>
                <td>{cliente.tipoDocumento.tipoDocumento}</td>
                <td>{cliente.numeroDocumento}</td>
                <td>{cliente.primerNombre}</td>
                <td>{cliente.segundoNombre}</td>
                <td>{cliente.primerApellido}</td>
                <td>{cliente.segundoApellido}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.celular}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.estado}</td>
                <td><Button color="warning" onClick={()=>{this.seleccionarCliente(cliente); this.modalInsertar()}}>Editar</Button>{" "}
                    <Button color="danger" onClick={()=>{this.seleccionarCliente(cliente); this.setState({modalEliminar: true})}}>Eliminar</Button></td></tr>));

    //JSX
    return (
        <div >
            <h1 align="center">Clientes</h1>
            <Button color="success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Insertar Nuevo Registro</Button> {" "}
            <a href="http://localhost:8080/clientes/export"><Button color="success">Exportar Clientes Archivo</Button></a>
            <br></br>
            <br></br>
            <Table>
                <tr align="center" textAlign="center">
                    <th>Id</th>
                    <th>Tipo Documento</th>
                    <th>Numero Documento</th>
                    <th>Primer Nombre</th>
                    <th>Segundo Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Celular</th>
                    <th>Correo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                <tbody align="center" textAlign="center">
                    {clientestags}
                </tbody>
            </Table>

            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}} closeButton>
                    <span style={{float: 'left'}}>Insertar Registro</span>
                    <Button style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</Button>
                </ModalHeader>
                <ModalBody>
                  <div>
                    <label htmlFor="idCliente">Id Cliente</label>
                    <input className="form-control" type="text" name="idCliente" id="idCliente"  readOnly onChange={this.handleChange} value={form?form.idCliente: ''}/>
                    <br/>
                    <label htmlFor="idTipoDocumento">Id Tipo Documento</label>
                    <input className="form-control" type="text" name="idTipoDocumento" id="idTipoDocumento" onChange={this.handleChange} value={form?form.idTipoDocumento: ''}/>
                    <br /> 
                    <label htmlFor="numeroDocumento">Numero de Documento</label>
                    <input className="form-control" type="text" name="numeroDocumento" id="numeroDocumento" onChange={this.handleChange} value={form?form.numeroDocumento: ''}/>
                    <br />
                    <label htmlFor="primerNombre">Primer Nombre</label>
                    <input className="form-control" type="text" name="primerNombre" id="primerNombre" onChange={this.handleChange} value={form?form.primerNombre: ''}/>
                    <br />
                    <label htmlFor="segundoNombre">Segundo Nombre</label>
                    <input className="form-control" type="text" name="segundoNombre" id="segundoNombre" onChange={this.handleChange} value={form?form.segundoNombre: ''}/>
                    <br />
                    <label htmlFor="primerApellido">Primer Apellido</label>
                    <input className="form-control" type="text" name="primerApellido" id="primerApellido" onChange={this.handleChange} value={form?form.primerApellido: ''}/>
                    <br />
                    <label htmlFor="segundoApellido">Segundo Apellido</label>
                    <input className="form-control" type="text" name="segundoApellido" id="segundoApellido" onChange={this.handleChange} value={form?form.segundoApellido: ''}/>
                    <br />
                    <label htmlFor="direccion">Direccion</label>
                    <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} value={form?form.direccion: ''}/>
                    <br />
                    <label htmlFor="telefono">Telefono</label>
                    <input className="form-control" type="text" name="telefono" id="telefono" onChange={this.handleChange} value={form?form.telefono: ''}/>
                    <br />
                    <label htmlFor="celular">Celular</label>
                    <input className="form-control" type="text" name="celular" id="celular" onChange={this.handleChange} value={form?form.celular: ''}/>
                    <br />
                    <label htmlFor="correo">Correo</label>
                    <input className="form-control" type="text" name="correo" id="correo" onChange={this.handleChange} value={form?form.correo: ''}/>
                    <br />
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal==='insertar'?
                    <Button color="success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </Button>: <Button color="primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </Button>
  }
                    <Button color="danger" onClick={()=>this.modalInsertar()}>Cancelar</Button>
                </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar el cliente {form && form.primerNombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionPatch()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
        </div>
        );
    }
}

const mapStateToModel= function(formObject){
    return {
        idCliente: formObject.idCliente,
        numeroDocumento: formObject.numeroDocumento,
        tipoDocumento:{
            idTipoDocumento: formObject.idTipoDocumento
        },
        primerNombre: formObject.primerNombre,
        segundoNombre: formObject.segundoNombre,
        primerApellido: formObject.primerApellido,
        segundoApellido: formObject.segundoApellido,
        direccion: formObject.direccion,
        telefono: formObject.telefono,
        celular: formObject.celular,
        correo: formObject.correo,
    };
    
}

export default ClientesScreen;