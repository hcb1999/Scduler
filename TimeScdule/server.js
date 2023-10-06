const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyparser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  //서버에서 데이터베이스 연결을 위한 데이터베이스 운영자 계정연동
  host: "localhost",
  user: "root",
  password: "gkackdqja123!",
  database: "initscduleapp",
  multipleStatements: true,
});

app.use(cors()); // cors라고 서버랑프론트엔드가 포트가 다르면 cors위반이라고 떠서 이 함수를 써줘야함
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.post("/api/scdule", (req, res) => {
  // api/scdule 서버에서 응답을 한 결과를 프론트엔드로 보냄
  const pcode = req.body.pcode;
  const groupcode = req.body.groupcode;

  if (groupcode) {
    // groupcode가 주어진 경우 (그룹 스케줄 데이터)
    const sql = "SELECT * FROM daily WHERE gcode=?; ";
    db.query(sql, groupcode, (err, results, fields) => {
      if (!err) {
        res.send(results);
      } else {
        res.send(err);
      }
    });
  } else {
    // groupcode가 주어지지 않은 경우 (개인 스케줄 데이터)
    const sql = "SELECT * FROM daily WHERE pcode = ? and gcode is null; ";
    db.query(sql, pcode, (err, results, fields) => {
      if (!err) {
        res.send(results);
      } else {
        res.send(err);
      }
    });
  }
});
app.post("/api/friend", (req, res) => {
  // api/scdule 서버에서 응답을 한 결과를 프론트엔드로 보냄
  const pcode = req.body.pcode;

  // groupcode가 주어진 경우 (그룹 스케줄 데이터)
  const sql =
    "SELECT people.id, people.name FROM friend, people WHERE friend.fid = people.id && friend.id = ?;";
  db.query(sql, pcode, (err, results, fields) => {
    if (!err) {
      res.send(results);
    } else {
      res.send(err);
    }
  });
});

app.post("/api/editscdule", (req, res) => {
  // 프론트엔드에서 받은 데이터값을 req=요청을 이용해 변수에 넣어주고 그 변수를 디비에 넣어줌 post=프론트엔드에서 보낸 데이터를 받아와서 서버에 넣어줌
  const pcode = req.body.pcode;
  const gcode = req.body.gcode;
  const title = req.body.title;
  const start = req.body.start;
  const end = req.body.end;
  const withpeo = req.body.withpeo;
  const place = req.body.place;
  const category = req.body.category;
  const sqlQuery =
    "INSERT INTO daily (pcode, title, start, end, withpeo, place, gcode,category) VALUES (?,?,?,?,?,?,?,?)";
  db.query(
    sqlQuery,
    [pcode, title, start, end, withpeo, place, gcode, category],
    (err, result) => {
      res.send("success!");
    }
  );
});

app.post("/api/user", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const name = req.body.name;
  const email = req.body.email;
  const tel = req.body.tel;
  const age = req.body.age;
  const sex = req.body.sex;
  const sqlQuery =
    "INSERT INTO people (id, password, name, email, tel, age, sex) VALUES (?,?,?,?,?,?,?)";

  db.query(
    sqlQuery,
    [id, password, name, email, tel, age, sex],
    (err, result) => {
      res.send("success");
    }
  );
});
app.post("/api/category", (req, res) => {
  // api/scdule서버에서 res=응답을 한결과를 프론트엔드에 send함수를 써서 보냄 get=서버에서 데이터를 프론트엔드로 보내주는 역할
  const pcode = req.body.pcode;
  const sql1 = "SELECT * FROM category where people_id = ?; ";

  db.query(sql1, pcode, (err, results, fields) => {
    if (!err) {
      res.send(results);
    } else {
      res.send(err);
    }
  });
});
app.post("/api/AddCategory", (req, res) => {
  const id = req.body.id;
  const catecory = req.body.cate;
  const sqlQuery = "INSERT INTO category (people_id, catename) VALUES (?,?)";

  db.query(sqlQuery, [id, catecory], (err, result) => {
    res.send("success");
  });
});

app.post("/api/AddFriend", (req, res) => {
  const id = req.body.id;
  const fid = req.body.fid;
  const date = req.body.date;

  const sqlQuery = "INSERT INTO friend (fid, id, date) VALUES (?,?,?);";
  const sqlQuery2 = "INSERT INTO friend (fid, id, date) VALUES (?,?,?);";
  db.query(
    sqlQuery + sqlQuery2,
    [fid, id, date, id, fid, date],

    (err, result) => {
      res.send("success");
    }
  );
});

app.post("/api/login", (req, res) => {
  const userid = req.body.id;
  const userpassword = req.body.pw;

  db.query(
    "SELECT name FROM people WHERE id = ? AND password=?",
    [userid, userpassword],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "아이디 또는 비밀번호를 다시 입력하세요!" });
      }
    }
  );
});

app.post("/api/test", (req, res) => {
  const findid = req.body.id;

  db.query("SELECT name FROM people WHERE id = ?", [findid], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "찾을수 없는 아이디 입니다." });
    }
  });
});
app.post("/api/selectscdule", (req, res) => {
  const scode = req.body.scode;
  db.query("SELECT * FROM daily WHERE scode = ?", [scode], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "wrong userid and password" });
    }
  });
});
app.post("/api/deletedaily", (req, res) => {
  const scode = req.body.scode;
  const sqlQuery = "DELETE FROM daily WHERE scode = ?;";
  db.query(sqlQuery, [scode], (err, result) => {
    res.send("success!");
  });
});
app.post("/api/Clubs", (req, res) => {
  // api/scdule서버에서 res=응답을 한결과를 프론트엔드에 send함수를 써서 보냄 get=서버에서 데이터를 프론트엔드로 보내주는 역할
  const pcode = req.body.pcode;
  const sql1 =
    "SELECT c.* FROM initscduleapp.clubs_member AS m JOIN initscduleapp.clubs AS c ON m.group_id = c.group_id WHERE m.member_id = ?; ";

  db.query(sql1, pcode, (err, results, fields) => {
    if (!err) {
      res.send(results);
    } else {
      res.send(err);
    }
  });
});
app.post("/api/AddClubs", (req, res) => {
  const name = req.body.name;
  const desc = req.body.desc;

  const sqlQuery = "INSERT INTO clubs (group_name, group_desc) VALUES (?, ?)";

  db.query(sqlQuery, [name, desc], (err, result) => {
    if (err) {
      console.error("Error adding club:", err);
      res.status(500).send("Error adding club");
      return;
    }
    const groupId = result.insertId; // 새로 생성된 group_id 가져오기
    res.json({ success: true, groupId });
  });
});
app.post("/api/clubmember", (req, res) => {
  // api/scdule서버에서 res=응답을 한결과를 프론트엔드에 send함수를 써서 보냄 get=서버에서 데이터를 프론트엔드로 보내주는 역할
  const pcode = req.body.pcode;
  const groupcode = req.body.groupcode;
  const sql1 =
    "SELECT group_king FROM clubs_member where group_id = ? && member_id = ?; ";

  db.query(sql1, [groupcode, pcode], (err, results, fields) => {
    if (!err) {
      res.send(results);
    } else {
      res.send(err);
    }
  });
});
app.post("/api/AddClubMember", (req, res) => {
  const memberId = req.body.memberId;
  const memberName = req.body.memberName;
  const clubId = req.body.clubId;
  const clubking = req.body.clubking;
  console.log(memberId);
  console.log(memberName);
  console.log(clubId);

  const sqlQuery =
    "INSERT INTO clubs_member (member_id,member_name, group_id,group_king) VALUES (?, ?, ?, ?)";

  db.query(
    sqlQuery,
    [memberId, memberName, clubId, clubking],
    (err, result) => {
      if (err) {
        console.error("Error adding club member:", err);
        res.status(500).send("Error adding club member");
        return;
      }

      res.json({ success: true });
    }
  );
});
app.post("/api/AddNotify", (req, res) => {
  // 프론트엔드에서 받은 데이터값을 req=요청을 이용해 변수에 넣어주고 그 변수를 디비에 넣어줌 post=프론트엔드에서 보낸 데이터를 받아와서 서버에 넣어줌
  const fid = req.body.fid;
  const id = req.body.id;
  const gid = req.body.groupid;

  // gid가 존재하는 경우에만 notify_gid 데이터를 넣음
  const sqlQuery =
    "INSERT INTO notify (notify_pid, notify_fid, notify_gid) VALUES (?,?,?)";
  const values = gid ? [id, fid, gid] : [id, fid, null];

  db.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data");
    } else {
      res.send("Success!");
    }
  });
});
app.post("/api/Notify", (req, res) => {
  // api/scdule서버에서 res=응답을 한결과를 프론트엔드에 send함수를 써서 보냄 get=서버에서 데이터를 프론트엔드로 보내주는 역할
  const pcode = req.body.pcode;
  const sql1 = "SELECT * FROM notify where notify_fid = ?; ";

  db.query(sql1, pcode, (err, results, fields) => {
    if (!err) {
      res.send(results);
    } else {
      res.send(err);
    }
  });
});
app.post("/api/deletenotify", (req, res) => {
  // api/scdule서버에서 res=응답을 한결과를 프론트엔드에 send함수를 써서 보냄 get=서버에서 데이터를 프론트엔드로 보내주는 역할
  const notifyid = req.body.notifyid;
  const sql1 = "DELETE FROM notify WHERE notify_id = ?; ";

  db.query(sql1, notifyid, (err, results, fields) => {
    if (!err) {
      res.send(results);
    } else {
      res.send(err);
    }
  });
});
/*
    res.send([

      
        {
             id: 1,
             title: "fds",//'event 1',
             end: '2021-06-14',
             start: "2021-06-14",
             withpeo: "최범준",
             SCODE:"4"
          },
          {
             id: 2,
             title: 'event 2',
             start: '2021-06-16T13:00:00',
             end: '2021-06-16T18:00:00',
             withpeo: "오재택",
             alarm : "06:00"
          },
          {  id: 3, 
             title: 'event 3', 
             start: '2021-06-17', 
             end: '2021-06-20' },
    ]);
    
});
*/

app.listen(port, () => console.log(`Listening on port ${port}`)); // 서버가 잘 작동하나 확인하는 함수 터미널에 node server.js 입력하면 포트번호 5000뜨면서 성공

/*
REST api
Create : POST
Read : GET
UPDATE: PUT
DELETE : DELETE
*/
