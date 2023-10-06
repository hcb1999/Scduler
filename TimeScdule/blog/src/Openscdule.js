import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
function Openscdule() {
  const navigate = useNavigate();
  const location = useLocation();
  const { test, scode, pcode, title, start, end, people, place, alarm } =
    location.state;
  const text = "";
  let name;
  function Friend({ f }) {
    //map함수를 이용해서 friend의 배열을 차례로 출력한다
    return <option>{f.id}</option>;
  }
  const scodetest = (e) => {
    text = e.target.value;
  };
  const showValue = (e) => {
    // 선택한 option의 value 값
    name = e.target.value;
    // option의 text 값
    console.log(name);
  };
  console.log(start);
  console.log(end);
  console.log(scode);

  const Delete = () => {
    axios
      .post("http://localhost:5000/api/deletedaily", {
        scode: scode,
      })
      .then(() => {
        alert("삭제 완료!");
        navigate(-1);
      });
  };
  const [selectstartdate, setstartdate] = useState(
    new Date("2014-08-18T21:11:5")
  ); //시작시간 material-ui를 가져오는데 datetimepicker에서 new Date()로 변수를 입력받아야되서 따로 뺏음 밑에도 같음
  const [selectenddate, setenddate] = useState(new Date("2014-08-19T21:11:5")); // 종료시간

  console.log(test);
  console.log(pcode);
  return (
    <div className="Container">
      <div className="Container_daily_name">일정 조회</div>
      <div>
        {" "}
        📅<strong>일정:</strong> {title}
      </div>{" "}
      <br />
      <div>
        {" "}
        👪<strong>동석자:</strong> {people}
      </div>{" "}
      <br />
      <div>
        {" "}
        🌏<strong>장소:</strong> {place}
      </div>{" "}
      <br />
      <div> </div>
      <div>
        <button className="Container_submit_button" onClick={Delete}>
          삭제하기
        </button>
      </div>
    </div>
  );
}
export default Openscdule;
