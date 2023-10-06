import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState, Component } from "react";
import "./App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //React-Router import
import Scdule from "./Scdule.js";
import Register from "./Register.js";
import Userlogin from "./Userlogin";
import Upload from "./Upload";
import Openscdule from "./Openscdule";
import AddFriend from "./AddFriend";
import AddCategory from "./AddCategory";
import GroupScdule from "./GroupScdule";

//**프로그램 실행방법 **//
//밑에 보이는 명령어 입력할수잇는 터미널창에서 yarn dev를 입력하면 실행됨 dev는 일종의 내가 지정한 명령어 서버와 클라이언트를 동시에 접속할수있게만듬
//실행하면 서버와 클라이언트가 열리게됨 보이는 화면이 프론트엔드, 서버는 위 주소에서 5000/api/scdule을 하면 이동가능

function App() {
  //풀캘린더 라이브러리 사용
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/groupscdule" element={<GroupScdule />} />
          <Route exact path="/test" element={<Scdule />} />
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Userlogin />} />
          <Route exact path="/upload" element={<Upload />} />
          <Route exact path="/openscdule" element={<Openscdule />} />
          <Route exact path="/AddFriend" element={<AddFriend />} />
          <Route exact path="/AddCategory" element={<AddCategory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
