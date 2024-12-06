import './App.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import bg from './img/bg.png';
import { useState } from 'react';
import data from './data';

function App(){

  let [shoes] = useState(data)
  let [num] = useState(0);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      <div className="main-bg" style={{backgroundImage : 'url('+bg+')'}}></div>
      
      <div className="container">
      <div className="row">
        {
          shoes.map((a,i)=>{
            return <Card shoes={shoes} num={i}/>
          })
        }
       
      </div>
    </div> 
    
    </div>
  )
}
function Card(props){
   return (
    <div className="col-md-4">
     <img src={"https://codingapple1.github.io/shop/shoes" + (props.num + 1) +".jpg"} width="80%" />
     <h4>{props.shoes[props.num].title}</h4>
     <h4>{props.shoes[props.num].price}</h4>
    </div>
   )
  }

export default App;
