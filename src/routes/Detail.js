import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(props) {
  let [num, setNUm] = useState('')
  useEffect(()=>{
    if(isNaN(num) == true){
      alert("숫자만 입력해주세요")
    }
    let time = setTimeout(()=>{setShowAlert(false)}, 2000)
    return()=>{
      clearTimeout(time);
      //unmount시 실행됨.
      //useEffect 실행전에 실행할 코드는 여기에 적으면 됨. clean up function 타이머 사용시 기존 타이머는 제거해주세요 , 기존 데이터요청은 제거해주세요. 등으로 사용
    }
  }, [num])//[]를 붙이면 mount때만 실행되고 update때는 실행이 되지 않음
  
  
  let [count, setCount] = useState(0)
  let [showAlert, setShowAlert] = useState(true)


  let {id} = useParams();
  let result = props.shoes.find((x) => x.id == id )

    return (
      <div className="container">
        {
          showAlert == true 
          ?  <div className ="alert alert-warning">
          2초이내 구매시 할인
        </div> : null
}
        <button onClick={()=>{setCount(count+1)}}>버튼</button>
        <div className="row">
          <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes" + (result.id + 1) + ".jpg"} width="100%" />
          </div>
          <input onChange={(e)=>{setNUm(e.target.value)}}></input>
          <div className="col-md-6">
            <h4 className="pt-5">{result.title}</h4>
            <p>{result.content}</p>
            <p>{result.price}</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      </div>
    )
  }

  export default Detail;