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
import { userNameState, userIdState } from "./recoil/UserState";
import { useNavigate, useLocation } from "react-router-dom";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MailDialog(props) {
  const { groupKey, groupname } = props;
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
      .post("http://localhost:5000/api/Notify", {
        pcode: userId,
      }) // 서버를 호출하고 호출한 서버에서 데이터를 가져와 setscdule 에 넣어줌
      .then((res) => {
        setfriend(res.data);
      });
  }, []);
  const GroupScdule = (groupKey, groupname) => {
    navigate("/test", {
      state: {
        groupKey: groupKey,
        groupname: groupname,
      },
    });
  };
  const notifyaccept = (notifyid, pid, groupid) => {
    if (groupid !== null) {
      // 그룹 아이디가 존재하는 경우, 클럽 멤버로 등록
      axios
        .post("http://localhost:5000/api/AddClubMember", {
          memberId: userId,
          memberName: userName,
          clubId: groupid, // 클럽 고유 번호 사용
          clubking: 0,
        })
        .then(() => {
          alert("클럽 등록 완료 그룹목록에서 확인해보세요!");
          axios
            .post("http://localhost:5000/api/deletenotify", {
              notifyid: notifyid,
            })
            .then(() => {
              navigate(0);
            });
        });
    } else {
      // 그룹 아이디가 null인 경우, 친구로 등록
      axios
        .post("http://localhost:5000/api/AddFriend", {
          fid: pid,
          id: userId,
          date: 16,
        })
        .then(() => {
          alert("친구등록 완료!");
          axios
            .post("http://localhost:5000/api/deletenotify", {
              notifyid: notifyid,
            })
            .then(() => {
              navigate(0);
            });
        });
    }
  };

  const notifydelete = (notifyid) => {
    axios
      .post("http://localhost:5000/api/deletenotify", {
        notifyid: notifyid,
      })
      .then(() => {
        navigate(0);
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
        <ListItemText
          key={frienda.group_id}
          primary={
            frienda.notify_gid !== null
              ? frienda.notify_pid + "님께서 그룹에 초대하였습니다!"
              : frienda.notify_pid + "님께서 친구로 초대하였습니다!"
          }
          secondary={frienda.group_desc}
        />
        <Button
          onClick={() =>
            notifyaccept(
              frienda.notify_id,
              frienda.notify_pid,
              frienda.notify_gid
            )
          }
          variant="contained"
        >
          수락
        </Button>
        <Button
          onClick={() => notifydelete(frienda.notify_id)}
          variant="contained"
        >
          거절
        </Button>
      </ListItem>
      <Divider style={dividerStyle} />
    </>
  ));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Badge
        onClick={handleClickOpen}
        badgeContent={friend.length}
        color="primary"
      >
        <MailIcon color="action" />
      </Badge>

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
              공지사항
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              나가기
            </Button>
          </Toolbar>
        </AppBar>
        <List>{menuList}</List>
      </Dialog>
    </div>
  );
}
