import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Register() {
  const theme = createTheme();

  // 상태 변수 초기화
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState({
    id: "",
    password: "",
    name: "",
    email: "",
    tel: "",
    age: "",
    sex: "",
  });
  const [errors, setErrors] = useState({});

  // 동의 체크
  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  // 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {};

    if (!user.id) {
      newErrors.id = "아이디를 입력하세요.";
    }

    if (!user.password || user.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    }

    if (!user.name) {
      newErrors.name = "이름을 입력하세요.";
    }

    if (!user.email || !user.email.includes("@")) {
      newErrors.email = "올바른 이메일 주소를 입력하세요.";
    }

    if (!user.tel) {
      newErrors.tel = "전화번호를 입력하세요.";
    }

    if (!user.age) {
      newErrors.age = "생년월일을 입력하세요.";
    }

    if (!user.sex) {
      newErrors.sex = "성별을 입력하세요.";
    }

    return newErrors;
  };

  // 입력 값 업데이트 핸들러
  const handleInput = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // 회원가입 버튼 클릭 시 실행
  const submitReview = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // 유효성 검사 통과 시 axios 요청 보내기
      axios
        .post("http://localhost:5000/api/user", {
          id: user.id,
          password: user.password,
          name: user.name,
          email: user.email,
          tel: user.tel,
          age: user.age,
          sex: user.sex,
        })
        .then(() => {
          alert("등록 완료!");
        });
    } else {
      // 유효성 검사 에러 발생 시 에러 상태 업데이트
      alert("빈 곳을 작성해주세요");
    }
  };

  const { id, password, name, email, tel, age, sex } = user;

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
            회원가입
          </Typography>
          <FormControl component="fieldset" variant="standard">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  onChange={handleInput}
                  value={id}
                  id="id"
                  name="id"
                  label="아이디를 입력하세요"
                  error={!!errors.id}
                  helperText={errors.id}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  type="password"
                  onChange={handleInput}
                  value={password}
                  id="password"
                  name="password"
                  label="비밀번호 입력 (숫자+영문자+특수문자 8자리 이상)"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleInput}
                  value={name}
                  id="name"
                  name="name"
                  label="이름"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  onChange={handleInput}
                  value={email}
                  id="email"
                  name="email"
                  label="이메일 주소"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  type="email"
                  onChange={handleInput}
                  value={tel}
                  id="tel"
                  name="tel"
                  label="전화번호"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  onChange={handleInput}
                  value={age}
                  id="age"
                  name="age"
                  label="생년월일"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleInput}
                  value={sex}
                  id="sex"
                  name="sex"
                  label="성별"
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={<Checkbox onChange={handleAgree} color="primary" />}
              label="회원가입 약관에 동의합니다."
            />
            <Button
              type="submit"
              onClick={submitReview}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
            >
              회원가입
            </Button>
            <Link to="./login">
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                로그인 페이지로 이동
              </Button>
            </Link>
          </FormControl>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
