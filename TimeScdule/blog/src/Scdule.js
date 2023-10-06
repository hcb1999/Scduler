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
import GroupInvite from "../src/GroupInvite";
import MailDialog from "../src/MailDialog";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
//**프로그램 실행방법 **//
//밑에 보이는 명령어 입력할수잇는 터미널창에서 yarn dev를 입력하면 실행됨 dev는 일종의 내가 지정한 명령어 서버와 프론트엔드를 동시에 접속할수있게만듬
//실행하면 서버와 프론트엔드가 열리게됨 보이는 화면이 프론트엔드, 서버는 위 주소에서 5000/api/scdule을 하면 이동가능
const FullCalendarApp = () => {
  //풀캘린더 라이브러리 사용
  const location = useLocation();
  const { groupKey, groupname } = location.state;
  const [scdule, setscdule] = useState({}); // 서버에서 데이터를 가져와 밑에 fullcalender모듈에서 event부분에 입력하면 화면에 일정이 나옴
  const [filteredEvents, setFilteredEvents] = useState({});
  const [friend, setfriend] = useState([{}]);
  const [category, setcategory] = useState([{}]);
  const [view, setView] = React.useState("list");
  const [clubmember, setclubmember] = useState([{}]);
  const handleChange = (event, nextView) => {
    setView(nextView);
  };
  const userName = useRecoilValue(userNameState); // Recoil 상태 값 가져오기
  const userId = useRecoilValue(userIdState); // Recoil 상태 값 가져오기

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/scdule", {
        pcode: userId,
        groupcode: groupKey,
      }) // 서버를 호출하고 호출한 서버에서 데이터를 가져와 setscdule 에 넣어줌
      .then((res) => {
        setscdule(res.data);
        setFilteredEvents(res.data);
        axios
          .post("http://localhost:5000/api/category", {
            pcode: userId,
          }) // 서버를 호출하고 호출한 서버에서 데이터를 가져와 setscdule 에 넣어줌
          .then((res) => {
            setcategory(res.data);
            console.log(res.data);
            if (groupKey === undefined) {
              // 그룹키가 없는 개인 화면 상태
            } else {
              axios
                .post("http://localhost:5000/api/clubmember", {
                  pcode: userId,
                  groupcode: groupKey,
                }) // 서버를 호출하고 호출한 서버에서 데이터를 가져와 setscdule 에 넣어줌
                .then((res) => {
                  setclubmember(res.data);
                });
            }
          });
      });
  }, [groupKey]);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  console.log(category);
  const navigate = useNavigate();

  const openupload = () => {
    const queryString = new URLSearchParams({
      id: userId,
      name: userName,
      groupKey: groupKey,
      category: category,
    }).toString();

    window.location.href = `/upload?${queryString}`;
  };

  const handleFilter = (category) => {
    console.log(clubmember[0].group_king);
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

  const catelist = category.map((cate) => (
    <ListItemButton
      value={cate.CATENAME}
      aria-label={cate.CATENAME}
      onClick={() => handleFilter(cate.CATENAME)}
      sx={{ pl: 4 }}
    >
      <ListItemIcon>
        <StarBorder />
      </ListItemIcon>
      <ListItemText primary={cate.CATENAME} />
    </ListItemButton>
  ));
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
                src="https://cdn-icons-png.flaticon.com/512/3364/3364044.png"
              />
              <div className="my_name">{groupname || userName}</div>
            </div>
          </div>
          <div></div>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="카테고리" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => handleFilter("전체보기")}
                  value="lisSt"
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="전체보기" />
                </ListItemButton>
                {catelist}
              </List>
            </Collapse>
          </List>
          <CateGory />
          {clubmember[0].group_king ? <GroupInvite groupid={groupKey} /> : null}
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
                "dayGridMonth,timeGridWeek,timeGridDay MailButton FriendButton GroupButton",
            }}
            customButtons={{
              FriendButton: {
                text: <FriendDialog />,
              },
              GroupButton: {
                text: <GroupDialog />,
              },
              MailButton: {
                text: <MailDialog groupname={groupname} groudid={groupKey} />,
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
