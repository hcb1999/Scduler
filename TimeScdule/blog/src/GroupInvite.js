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

export default function GroupInvite(props) {
  const { groupid } = props;
  const navigate = useNavigate();
  const [friend, setfriend] = useState([{}]);

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [findid, setfindid] = useState("");
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
  const dividerStyle = {
    width: "100%",
  };
  const onChange = (event) => {
    setfindid(event.target.value);
  };
  const openModal = () => {
    setModalOpen(true);
    console.log(groupid);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const addgroup = (friendid) => {
    console.log(friendid);
    axios
      .post("http://localhost:5000/api/AddNotify", {
        fid: friendid,
        id: userId,
        groupid: groupid,
      })
      .then(() => {
        alert("친구에게 그룹 초대메시지를 보냇습니다!");
        navigate(0);
      });
  };
  const menuList = friend.map((frienda) => (
    <>
      <ListItem onClick={() => addgroup(frienda.id)}>
        <ListItemText primary={frienda.name} secondary={frienda.id} />
      </ListItem>
      <Divider style={dividerStyle} />
    </>
  ));
  return (
    <div>
      <div onClick={openModal}>
        <PeopleAltIcon
          style={{ marginTop: "5px", fontSize: "13px" }}
        ></PeopleAltIcon>
        그룹에 초대하기
      </div>

      <Modal open={modalOpen} close={closeModal} header="그룹 추가">
        <div>
          <div>{menuList}</div>
        </div>
      </Modal>
    </div>
  );
}
