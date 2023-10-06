import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormControl from "@mui/material/FormControl"; // FormControl을 임포트합니다.
import InputLabel from "@mui/material/InputLabel"; // InputLabel을 임포트합니다.
import Select from "@mui/material/Select"; // Select를 임포트합니다.
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userNameState } from "../src/recoil/UserState";
import { useRecoilValue } from "recoil";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import NoteIcon from "@mui/icons-material/Note";
import PlaceIcon from "@mui/icons-material/Place";
function Upload() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const groupKey = searchParams.get("groupKey");
  const userName = useRecoilValue(userNameState); // Recoil 상태 값 가져오기
  const [age, setAge] = useState("");
  const [cate, setcate] = useState([{}]);
  const [selectstartdate, setstartdate] = useState(
    new Date("2014-08-18T21:11:5")
  ); //시작시간 material-ui를 가져오는데 datetimepicker에서 new Date()로 변수를 입력받아야되서 따로 뺏음 밑에도 같음
  const [selectenddate, setenddate] = useState(new Date("2014-08-19T21:11:5")); // 종료시간
  const [send, setsend] = useState({
    // 프론트엔드 화면에서 일정을 입력하면 서버(데이터베이스)에 저장하려고 만든 변수
    pcode: id,
    title: "",
    withpeo: "",
    place: "",
    ccode: "",
  });
  console.log(cate);
  console.log(id);
  console.log(groupKey);
  const { pcode, title, withpeo, place, ccode } = send;
  const onChange = (event) => {
    const { name, value } = event.target; //구조 분해 할당
    setsend({
      ...send,
      [name]: value,
    });
  };
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/category", {
        pcode: id,
      }) // 서버를 호출하고 호출한 서버에서 데이터를 가져와 setscdule 에 넣어줌
      .then((res) => {
        setcate(res.data);
      });
  }, []);
  const submitReview = () => {
    console.log(send.ccode);
    axios
      .post("http://localhost:5000/api/editscdule", {
        pcode: id,
        gcode: groupKey === "undefined" ? null : groupKey,
        title: send.title,
        start: selectstartdate,
        end: selectenddate,
        withpeo: send.withpeo,
        place: send.place,
        category: age,
      })
      .then(() => {
        console.log(age);
        alert("등록 완료!");
        navigate(-1);
      });
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const catelist = cate.map((cate) => (
    <MenuItem value={cate.CATENAME}>{cate.CATENAME}</MenuItem>
  ));
  return (
    <div className="Container">
      <div className="Container_daily_name"> 일정 추가</div>

      <div className="Container_content">
        <TextField
          name="title"
          value={title}
          onChange={onChange}
          label="일정을 입력하세요"
          className="scdule"
          InputProps={{
            startAdornment: <EditCalendarIcon />,
          }}
        />
        <TextField
          name="place"
          value={place}
          onChange={onChange}
          label="장소를 입력하세요"
          InputProps={{
            startAdornment: <PlaceIcon />,
          }}
        />
      </div>
      <div className="Container_content">
        <TextField
          name="withpeo"
          value={withpeo}
          onChange={onChange}
          label="동석자를 입력하세요"
          className="scdule"
          InputProps={{
            startAdornment: <AccountCircle />,
          }}
        />
        <TextField
          name="content"
          //value={place}
          //onChange={onChange}
          label="세부내용을 입력하세요"
          InputProps={{
            startAdornment: <NoteIcon />,
          }}
        />
      </div>
      <div className="Container_content">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            value={selectstartdate}
            onChange={setstartdate}
            label="시작시간"
            className="scdule"
          />
          <DateTimePicker
            value={selectenddate}
            onChange={setenddate}
            label="종료시간"
          />
        </LocalizationProvider>
      </div>
      <div className="Container_content">
        <FormControl className="scdule" sx={{ m: 1, minWidth: 260 }}>
          <InputLabel id="demo-select-small-label">카테고리</InputLabel>
          <Select value={age} label="Age" onChange={handleChange}>
            <MenuItem value="">
              <em>없음</em>
            </MenuItem>
            {catelist}
          </Select>
        </FormControl>
      </div>
      <footer>
        <button className="Container_submit_button" onClick={submitReview}>
          일정 추가
        </button>
      </footer>
    </div>
  );
}
export default Upload;
