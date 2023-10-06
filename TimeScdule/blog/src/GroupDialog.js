import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Modal from "./Modal";
import TextField from "@material-ui/core/TextField";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userNameState, userIdState } from "../src/recoil/UserState";
import { useNavigate, useLocation } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FriendDialog() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [Group, SetGroup] = useState("");
  const [GroupName, SetGroupName] = useState("");
  const [status, setstatus] = useState("");
  const [friend, setfriend] = useState([{}]);

  const userId = useRecoilValue(userIdState); // Recoil 상태 값 가져오기
  const userName = useRecoilValue(userNameState); // Recoil 상태 값 가져오기
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/Clubs", {
        pcode: userId,
      }) // 서버를 호출하고 호출한 서버에서 데이터를 가져와 setscdule 에 넣어줌
      .then((res) => {
        setfriend(res.data);
      });
  }, []);
  const AddClubs = () => {
    console.log(userId);
    console.log(GroupName);

    axios
      .post("http://localhost:5000/api/AddClubs", {
        name: GroupName,
        desc: "16",
      })
      .then((response) => {
        console.log(response.data.groupId);
        const clubId = response.data.groupId; // 서버에서 클럽 고유 번호를 반환하는 것으로 가정
        console.log(clubId);
        // 클럽 멤버 테이블에 클럽 멤버 아이디와 클럽 고유 번호 추가
        axios
          .post("http://localhost:5000/api/AddClubMember", {
            memberId: userId,
            memberName: userName,
            clubId: clubId, // 클럽 고유 번호 사용
            clubking: 1,
          })
          .then(() => {
            alert("클럽과 클럽 멤버 등록 완료!");
            navigate(0);
          });
      });
  };
  const GroupScdule = (groupKey, groupname) => {
    setOpen(false);
    navigate("/test", {
      state: {
        groupKey: groupKey,
        groupname: groupname,
      },
    });
  };
  const dividerStyle = {
    width: "100%",
  };
  const menuList = friend.map((frienda) => (
    <>
      <ListItem
        onClick={() => GroupScdule(frienda.group_id, frienda.group_name)}
      >
        <ListItemText key={frienda.group_id} primary={frienda.group_name} />
      </ListItem>
      <Divider style={dividerStyle} />
    </>
  ));
  const onChange = (event) => {
    SetGroupName(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <PeopleAltIcon
        style={{ marginTop: "5px", fontSize: "13px" }}
        onClick={handleClickOpen}
      ></PeopleAltIcon>
      그룹
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              그룹목록
            </Typography>
            <Button autoFocus color="inherit" onClick={openModal}>
              추가
            </Button>
            <Modal open={modalOpen} close={closeModal} header="그룹 추가">
              <div>
                <TextField
                  name="find"
                  value={GroupName}
                  onChange={onChange}
                  label="그룹명을 입력하세요"
                />

                <div>
                  <span style={{ color: "black" }}>{status}</span>
                  <button
                    className="Container_submit_button"
                    onClick={AddClubs}
                  >
                    추가
                  </button>
                </div>
              </div>
            </Modal>
          </Toolbar>
        </AppBar>
        <ListItem onClick={() => GroupScdule()}>
          <ListItemText primary="내 일정으로 돌아가기" />
        </ListItem>
        <Divider style={dividerStyle} />
        <List>{menuList}</List>
      </Dialog>
    </div>
  );
}
