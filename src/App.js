import './App.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap'
import bg from './img/bg.png';
import { useState } from 'react';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js'
import axios from 'axios'

function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [count, setCount] = useState(0);


  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('./detail') }}>detail</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg" style={{ backgroundImage: 'url(' + bg + ')' }}></div>

            <div className="container">
              <div className="row">
                {
                  shoes.map((a, i) => {
                    return <Card shoes={shoes} num={i} key={i} />
                  })
                }
              </div>
            </div>
            {count<2 ?  <PlusButton shoes={shoes} count={count} setShoes={setShoes} setCount={setCount}/> :null}
           
          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />//:id=url파라미터
        <Route path="/about" element={<About />} >
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
        <Route path="/event" element={<div><h4>오늘의 이벤트</h4><Outlet></Outlet></div>} >
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>


        <Route path="*" element={<div>없는 페이지에용</div>} />
      </Routes>



    </div>
  )
}


function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  )
}


function Card(props) {
  return (
    <div className="col-md-4">
      <Link to={"/detail/" + (props.num)}>
        <img src={"https://codingapple1.github.io/shop/shoes" + (props.num + 1) + ".jpg"} width="80%" />
      </Link>
      <h4>{props.shoes[props.num].title}</h4>
      <h4>{props.shoes[props.num].price}</h4>
    </div>
  )
}

function PlusButton(props){
  return(
    <button onClick={() => {
      if (props.count === 0) {
        axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((결과) => {
            let copy = [...props.shoes, ...결과.data]
            props.setShoes(copy);
            props.setCount(1);
          })
          .catch(() => {

          })
      }else if (props.count === 1) {
        axios.get('https://codingapple1.github.io/shop/data3.json')
          .then((결과) => {
            let copy = [...props.shoes, ...결과.data]
            props.setShoes(copy);
            props.setCount(2);
          })
          .catch(() => {

          })
      }

    }}>버튼</button>
  )
}

export default App;
