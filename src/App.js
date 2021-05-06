import React, { Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import FormularioScreen from './screens/formulario/formularioScreen';
import IncidentesScreen from './screens/incidentes/incidentesScreen'

class App extends Component{
  constructor() {
    super();

    this.state = {
      menu: 0
    }
    this.handlerOnClickMostrarIncidentes = this.handlerOnClickMostrarIncidentes.bind(this);
  }

  handlerOnClickMostrarIncidentes(event){
    this.setState({
      menu: 1
    });
  }

  render() {
    let menuElements = null;
    if (this.state.menu === 1) {
      menuElements = <IncidentesScreen></IncidentesScreen>
    }else if(this.state.menu === 0){
      menuElements = <FormularioScreen></FormularioScreen>
    }
  return (
    <div className="App">
    <header className="App-header" align="center">
      <div>
        <Navbar color="success" light expand="md">
          <NavbarBrand href="/">Service Desk Poli</NavbarBrand>
          <NavbarToggler></NavbarToggler>
          <Collapse navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Button style={{color: '#000000'}} color="success" onClick={this.handlerOnClickMostrarIncidentes} >Incidentes</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      <section className="componentes">
            {menuElements}
      </section>
    </header>
    <div>
    </div>
  </div>
);
}
}

export default App;
