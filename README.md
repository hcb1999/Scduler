<div align=center>

일정관리를 수월하게 하고 친구와 공유할 수 있는 웹 서비스
# **Scheduler**

<img src="https://capsule-render.vercel.app/api?type=shark&color=auto&height=300&section=header&text=Scheduler%20&fontSize=90" />
<br/><br/>
일정을 추가하여 관리할 수 있는 Scheduler를 만들고 친구와 일정을 공유하고싶어 만든 프로젝트입니다.

mysql를 통해 로그인기능과 실시간 데이터베이스 기능을 구현하였습니다.


테스트 id : 3 <br />
테스트 pw : 3


<br /><hr />
</div>

## 🔍 미리보기
### 로그인 회원가입페이지

- 로그인, 회원가입 기능

<img width="600" alt="로그인" src="https://github.com/hcb1999/Secondtimescduler/assets/79968715/74d12a94-ee3d-4ed3-8288-8d3ede937788">

<img width="600" alt="회원가입" src="https://github.com/hcb1999/Secondtimescduler/assets/79968715/0e9db585-5008-45c1-9c22-a8ae794c01a6">



### Home 페이지
- 일정 생성 기능
- 일정 월,주,일로 보기 기능
- 일정 CRUD 기능

![일정추가](https://github.com/hcb1999/Secondtimescduler/assets/79968715/e53d84b2-b271-409a-b802-887afd61404b)
![일정삭제](https://github.com/hcb1999/Secondtimescduler/assets/79968715/be43820a-8667-4cc4-b4ed-87c1834e6b15)




### 친구 추가 기능
- 아이디 검색 / 친구 등록

![친구추가](https://github.com/hcb1999/Secondtimescduler/assets/79968715/12d9c6d6-8d83-40d4-be43-914d89ec538a)


### to do list 와 today 기능.
- 할일 리스트 추가와 today버튼 누르면 오늘 날짜로 돌아오기 기능.

![todlist](https://github.com/hcb1999/Secondtimescduler/assets/79968715/98ec64da-e640-4175-a5ca-7c1bb0a65fa4)


## 🕑 작업기간
2022.06 - 2022.08 (약 2개월)

## 🔧 설치 방법
```
cd TimeScdule
npm install
yarn add @material-ui/pickers
yarn dev
```

## 🛠 기술 스택
<div align=left>
    <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
    <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
</div><br />

## 📌 기능 소개
### 주요 기능
|기능|내용|
|--|------|
|**일정 생성 기능**|시간과 장소 동석자를 정하여 일정을 생성하는 기능.|
|**친구 추가기능**|친구 아이디를 찾아 추가하는 능 |
|**to do list와 today 기능**|할일과 달력을 오늘 날짜로 돌아올 수능있는 기능|

### 상세 기능
- 로그인, 로그아웃 및 회원가입
- 생성한 일정 CRUD (Create, Read, Update, Delete)
- 생성한 일정을 일,주,월로 볼 수 있는 기능



## 📚 느낀 점
- 기획단계에서 ERD와 기능명세서를 자세하게 쓰면 쓸수록 좋다는 것을 배움.
- javascript를 사용하여 일일이 요소를 지정해 이벤트를 지정해주는것보다 훨씬 편하다는 것을 배움.


## ✏ 개선사항

- 회원 탈퇴 기능 개발 필요
- css가 전반적으로 아쉬움
- 주 n회, 월 n회 등 다회성 과제에 대한 todo 로직 개발 필요

