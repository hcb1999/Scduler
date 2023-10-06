import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@mui/material/Avatar";
import React, { useEffect, useState } from "react";
import "./App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userNameState, userIdState } from "../src/recoil/UserState";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import FriendDialog from "../src/FriendDialog";
import GroupDialog from "../src/GroupDialog";
import CateGory from "../src/CateGory";
//**프로그램 실행방법 **//
//밑에 보이는 명령어 입력할수잇는 터미널창에서 yarn dev를 입력하면 실행됨 dev는 일종의 내가 지정한 명령어 서버와 프론트엔드를 동시에 접속할수있게만듬
//실행하면 서버와 프론트엔드가 열리게됨 보이는 화면이 프론트엔드, 서버는 위 주소에서 5000/api/scdule을 하면 이동가능
const FullCalendarApp = () => {
  //풀캘린더 라이브러리 사용
  const location = useLocation();
  const { id, name, groupKey } = location.state;
  const [scdule, setscdule] = useState({}); // 서버에서 데이터를 가져와 밑에 fullcalender모듈에서 event부분에 입력하면 화면에 일정이 나옴
  const [filteredEvents, setFilteredEvents] = useState({});
  const [friend, setfriend] = useState([{}]);
  const userName = useRecoilValue(userNameState); // Recoil 상태 값 가져오기
  const userId = useRecoilValue(userIdState); // Recoil 상태 값 가져오기
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/groupscdule", {
        groupcode: groupKey,
      }) // 서버를 호출하고 호출한 서버에서 데이터를 가져와 setscdule 에 넣어줌
      .then((res) => {
        console.log(res.data);
        setscdule(res.data);
        setFilteredEvents(res.data);
      });
  }, []);

  console.log(friend);
  console.log(userName);
  const navigate = useNavigate();

  const openupload = () => {
    navigate("/upload", {
      state: {
        groupKey: groupKey,
        id: id,
        name: name,
      },
    });
  };

  const handleFilter = (category) => {
    //카테고리 버튼
    if (category === "전체보기") {
      setFilteredEvents(scdule); // 전체보기 버튼 클릭 시 전체 일정 표시
      console.log(filteredEvents);
    } else {
      const filtered = scdule.filter((event) => event.category === category);
      setFilteredEvents(filtered);
      console.log(filteredEvents);
    }
  };
  return (
    <div>
      <div id="header" style={{ display: "flex" }}>
        <div class="section-left">
          <div class="Header-logo">
            {" "}
            <CalendarTodayIcon style={{ fontSize: "40px" }} />
            Calendar
          </div>
          <div class="section-left-content">
            <div className="my_profile">
              <Avatar
                sx={{ width: 200, height: 200 }}
                alt="Semy Sharp"
                src="/static/images/avatar/1S.jpg"
              />
              <div className="my_name">{groupKey}</div>
            </div>
          </div>
          <div>
            유저이름: {userName} /{userId}
          </div>
          <button onClick={() => handleFilter("회의")}>회의 일정만 보기</button>
          <button onClick={() => handleFilter("전체보기")}>전체보기</button>
          <CateGory />
        </div>

        <div style={{ width: "100vw" }}>
          <FullCalendar //풀캘린더 모듈 함수
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              // 화면 중앙 상단 헤더부분 center 순서대로 월 주 일
              start: "today prev,next",
              center: "title",
              right:
                "dayGridMonth,timeGridWeek,timeGridDay FriendButton GroupButton",
            }}
            customButtons={{
              FriendButton: {
                text: <FriendDialog />,
              },
              GroupButton: {
                text: <GroupDialog />,
              },
            }}
            events={filteredEvents} // 일정을 달력위에 뿌려줌
            eventColor="gray"
            nowIndicator
            height={"100vh"}
            eventClick={(info) => {
              axios
                .post("http://localhost:5000/api/selectscdule", {
                  scode: info.event.extendedProps.scode,
                })
                .then((response) => {
                  navigate("/openscdule", {
                    state: {
                      scode: info.event.extendedProps.scode,
                      pcode: response.data[0].pcode,
                      ccode: response.data[0].ccode,
                      title: response.data[0].title,
                      start: response.data[0].start,
                      end: response.data[0].end,
                      people: response.data[0].withpeo,
                      place: response.data[0].place,
                      alarm: response.data[0].alarm,
                      test: friend,
                    },
                  });
                });
            }}
            locale="ko" // 한국어버전
          />
        </div>
        <div className="addbtn">
          <Fab
            onClick={openupload}
            color="primary"
            aria-label="add"
            variant="extended"
          >
            <AddIcon onClick={openupload} />
            일정추가
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default FullCalendarApp;
