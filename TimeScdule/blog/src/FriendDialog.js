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
  const [findid, setfindid] = useState("");
  const [status, setstatus] = useState("");
  const [friend, setfriend] = useState([{}]);

  const userId = useRecoilValue(userIdState); // Recoil 상태 값 가져오기
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/friend", {
        pcode: userId,
      }) // 서버를 호출하고 호출한 서버에서 데이터를 가져와 setscdule 에 넣어줌
      .then((res) => {
        setfriend(res.data);
      });
  }, []);
  const addfriend = () => {
    console.log(userId);
    if (userId === findid) {
      alert("같은아이디는 추가할수없습니다!");
    } else {
      axios
        .post("http://localhost:5000/api/AddNotify", {
          fid: findid,
          id: userId,
        })
        .then(() => {
          navigate(0);
        });
    }
  };
  const findfriend = () => {
    console.log(findid);

    if (userId === findid) {
      // userid와 findid가 같은 경우
      setstatus("이미 자신의 아이디입니다");
    } else {
      axios
        .post("http://localhost:5000/api/test", {
          id: findid,
        })
        .then((response) => {
          if (response.data.message) {
            setstatus(response.data.message);
          } else {
            setstatus(response.data[0].name);
          }
        });
    }
  };

  const dividerStyle = {
    width: "100%",
  };
  const menuList = friend.map((frienda) => (
    <>
      <ListItem button>
        <ListItemText primary={frienda.name} secondary={frienda.id} />
      </ListItem>
      <Divider style={dividerStyle} />
    </>
  ));
  const onChange = (event) => {
    setfindid(event.target.value);
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
      친구
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
              친구목록
            </Typography>
            <Button autoFocus color="inherit" onClick={openModal}>
              추가
            </Button>
            <Modal open={modalOpen} close={closeModal} header="친구 검색">
              <div>
                <TextField
                  name="find"
                  value={findid}
                  onChange={onChange}
                  label="아이디로 찾기"
                />
                <button
                  className="Container_submit_button"
                  onClick={findfriend}
                >
                  검색
                </button>
                <div>
                  <span style={{ color: "black" }}>{status}</span>
                  <button
                    className="Container_submit_button"
                    onClick={addfriend}
                  >
                    추가
                  </button>
                </div>
              </div>
            </Modal>
          </Toolbar>
        </AppBar>
        <List>{menuList}</List>
      </Dialog>
    </div>
  );
}
