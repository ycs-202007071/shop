import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Nav} from 'react-bootstrap';

import {Context1} from './../App.js'

function Detail(props) {

  let [num, setNUm] = useState('')
  useEffect(() => {
    if (isNaN(num) == true) {
      alert("숫자만 입력해주세요")
    }
    let time = setTimeout(() => { setShowAlert(false) }, 2000)
    return () => {
      clearTimeout(time);
      //unmount시 실행됨.
      //useEffect 실행전에 실행할 코드는 여기에 적으면 됨. clean up function 타이머 사용시 기존 타이머는 제거해주세요 , 기존 데이터요청은 제거해주세요. 등으로 사용
    }
  }, [num])//[]를 붙이면 mount때만 실행되고 update때는 실행이 되지 않음


  let [showAlert, setShowAlert] = useState(true)
  let [tap, setTap] = useState(0)
  let { id } = useParams();
  let result = props.shoes.find((x) => x.id == id)


  
  useEffect(()=>{
    let 꺼낸거 = localStorage.getItem('watched')
    꺼낸거 = JSON.parse(꺼낸거)
    꺼낸거.push(result.id)
    꺼낸거 = new Set(꺼낸거)
    꺼낸거 = Array.from(꺼낸거)
    localStorage.setItem('watched', JSON.stringify(꺼낸거))
  }, [])


  return (
    <div className="container">
      {
        showAlert == true
          ? <div className="alert alert-warning">
            2초이내 구매시 할인
          </div> : null
      }

      
      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes" + (result.id + 1) + ".jpg"} width="100%" />
        </div>
        <input onChange={(e) => { setNUm(e.target.value) }}></input>
        <div className="col-md-6">
          <h4 className="pt-5">{result.title}</h4>
          <p>{result.content}</p>
          <p>{result.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={()=>setTap(0)}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={()=>setTap(1)}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={()=>setTap(2)}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TapContent tap={tap}></TapContent>
    </div>
  )
}
function TapContent({tap}){

  let [fade, setFade] = useState('')
 
  
  useEffect(()=>{
    setTimeout(()=>{setFade('end')}, 10)
    return()=>{
      setFade('')
    }
  },[tap])

  return (<div className={'start ' +  fade}>
    {[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][tap]}
    </div>)
}

export default Detail;