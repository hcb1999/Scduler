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

export default function CateGory() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [catename, setcatename] = useState("");

  const userId = useRecoilValue(userIdState); // Recoil 상태 값 가져오기
  const addcategory = () => {
    console.log(userId);
    axios
      .post("http://localhost:5000/api/AddCategory", {
        cate: catename,
        id: userId,
      })
      .then(() => {
        alert("등록 완료!");
        navigate(0);
      });
  };
  const onChange = (event) => {
    setcatename(event.target.value);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <div onClick={openModal}>
        <PeopleAltIcon
          style={{ marginTop: "5px", fontSize: "13px" }}
        ></PeopleAltIcon>
        카테고리 추가하기
      </div>

      <Modal open={modalOpen} close={closeModal} header="카테고리 추가">
        <div>
          <TextField
            name="find"
            value={catename}
            onChange={onChange}
            label="카테고리명을 입력하세요"
          />

          <div>
            <button className="Container_submit_button" onClick={addcategory}>
              추가
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
