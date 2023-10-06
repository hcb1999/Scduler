import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userNameState, userIdState } from "../src/recoil/UserState";
import axios from "axios";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

function Userlogin() {
  const [id, setid] = useState();
  const [pw, setpw] = useState("");
  const navigate = useNavigate();
  const [loginstatus, setloginstatus] = useState("");
  const [, setUserName] = useRecoilState(userNameState); // Recoil 상태를 가져옵니다.
  const [, setUserId] = useRecoilState(userIdState); // Recoil 상태를 가져옵니다.

  const theme = createTheme();
  const login = () => {
    axios
      .post("http://localhost:5000/api/login", {
        id: id,
        pw: pw,
      })
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);

          setloginstatus(response.data.message);
        } else {
          setUserName(response.data[0].name); // Recoil 상태에 이름 저장
          setUserId(id); // Recoil 상태에 이름 저장

          navigate("/test", {
            state: {
              id: id,
              name: response.data[0].name,
            },
          });

          // setloginstatus(response.data[0].name);
        }
        console.log(response);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <FormControl component="fieldset" variant="standard">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  onChange={(e) => {
                    setid(e.target.value);
                  }}
                  id="id"
                  name="id"
                  label="아이디를 입력하세요"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  type="email"
                  onChange={(e) => {
                    setpw(e.target.value);
                  }}
                  id="password"
                  name="password"
                  label="비밀번호 입력  (숫자+영문자+특수문자 8자리 이상)"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              onClick={login}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
            >
              로그인
            </Button>
          </FormControl>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Userlogin;
