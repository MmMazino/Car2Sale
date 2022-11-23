var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const fs = require("fs");
const multer = require('multer');
const path = require('path')
const { json, Router } = require('express')

/* Router */
const salecar = require('./routes/salecar');
const getmodelcar = require('./routes/getsalecar');
const testroute = require('./routes/testroute')
const getdatasalecar = require('./routes/getdatasalecar')
const getdatacarforsale = require('./routes/getdatacarforsale')
const post = require('./routes/post')
/* Router */

var jwt = require('jsonwebtoken');
const secret = "Fullstack-Car2sale"

const bcrypt = require('bcrypt')
const saltRounds = 10

app.use(cors());
app.use(express.json());

const HOSTNAME = `localhost`;
const PORT = `3333`;
const HOST = `http://${HOSTNAME}:${PORT}`;


const mysql = require('mysql2');
const { request } = require('http');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'car2sale'
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to mysql database = ", err)
    return;
  }
  console.log("Mysql successfully connected!")
})

app.use('/salecar',salecar)
app.use(getmodelcar)
app.use('/getdatasalecar',getdatasalecar)
app.use(getdatacarforsale)
app.use(post)

/* Image */
app.use('/Avatar', express.static('Avatar'));
app.use('/img-car', express.static('img-car'));

app.post('/login', jsonParser, function (req, res) {
  connection.execute(
      'SELECT * FROM tbl_member WHERE m_email=?',
      [req.body.username],
      function (err, tbl_member, fields) {
          if (err) {
              res.json({ status: 'error', message: err });
              return
          }
          if (tbl_member.length == 0) {
              res.json({ status: 'error', message: 'no user found' });
              return
          }
          bcrypt.compare(req.body.password, tbl_member[0].m_pass, function (err, isLogin) {
              if (isLogin) {
                  var token = jwt.sign({ email: tbl_member[0].m_email }, secret, { expiresIn: '2h' });
                  const user = { id: tbl_member[0].m_id, email: tbl_member[0].m_email, fname: tbl_member[0].m_fname, lname: tbl_member[0].m_lname, avatar: tbl_member[0].m_imgpath }
                  res.json({ status: 'ok', message: 'Login success', token, user })
              }
              else {
                  res.json({ status: 'eror', message: 'Login failed' })
              }
          });
      }
  )
})

const storageAvatar = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'Avatar')
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storageAvatar })

app.post('/uploadavatar', upload.single('avatar'), function (req, res, next) {
  try {
    res.status(200).send({ status: 'ok', imagename: `${req.file.filename}` })
  }
  catch (err) {
    res.send("Eror:" + err)
  }
})

app.post('/register', jsonParser, function (req, res, next) {
  const imgpath = `${HOST}/Avatar/${req.body.imgname}`;
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.execute(
      'INSERT INTO tbl_member (m_email,m_pass,m_fname,m_lname,m_tel,m_idline,m_imgname,m_imgpath,m_date_save,Role) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [req.body.email, hash, req.body.fname, req.body.lname, req.body.tel, req.body.idline, req.body.imgname, imgpath, req.body.date, req.body.role],
      function (err, results, fields) {
        if (err) {
          res.json({ status: 'error', message: err })
          return
        }
        res.status(200).send({ status: 'ok', message: "register success" })
      }
    )
  });
})

app.put('/updateprofile', jsonParser, function (req, res) {
  const id = req.body.id;
  const email = req.body.newemail;
  const tel = req.body.newtel;
  const idline = req.body.newline;
  connection.query("UPDATE tbl_member SET m_email = ? , m_tel = ? , m_idline = ? WHERE m_id = ?", [email, tel, idline, id], (err, results) => {
    if (err) {
      console.log(err);
    }
    else {
      res.status(200).send({ message: "update success" })
    }
  })
})

app.post('/changepassword', async (req, res) => {
  const id = req.body.id;
  const newpass = req.body.newpassword;
  const oldpass = req.body.oldpassword;
  const hash = bcrypt.hashSync(newpass, saltRounds);
  try {
    connection.query("SELECT * FROM tbl_member WHERE m_id=?", [id], (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(400).send();
      }
      if (results.length == 0) {
        res.status(400).json({ message: "User not found" })
      }
      bcrypt.compare(oldpass, results[0].m_pass, (err, ismatch) => {
        if (ismatch) {
          connection.query("UPDATE tbl_member SET m_pass = ? WHERE m_id = ?", [hash, id], (err, results) => {
            if (err) {
              console.log(err);
            }
            else {
              res.status(200).send({ status: "ok", message: "update success" })
            }
          })
        }
        if (!ismatch) {
          res.status(400).json({ status: "fail", message: "oldpass is notmatch" });
        }
        if (err) {
          res.status(400).json({ message: err });
        }
      })
    })
  }
  catch (err) {
    res.status(400).json(err)
  }
})

app.get('/user/:id', async (req, res) => {
  const id = req.params.id
  try {
    connection.query(
      "SELECT * FROM tbl_member WHERE m_id = ?", [id], (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json(results)
      }
    )
  }
  catch (err) {
    console.log(err)
    return res.status(500).send();
  }
})

app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})