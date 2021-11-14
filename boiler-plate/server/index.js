const express = require('express') // express module 가져옴
const app = express() //function을 이용해 새로운 app을 만듦
const port = 5000 //port 번호
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require("./config/key");
const { auth } = require("./middleware/auth");

const { User } = require("./models/User");



// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.use(express.json()) //For JSON Requests, application/json
app.use(express.urlencoded({extended: true})); //application/x-www-form-urlencoded
app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


// 루트 디렉토리에 오면 Hello World 출력
app.get('/', (req, res) => {res.send('Hello World! 안녕하세요!')})

// 회원가입 창
app.post('/api/users/login', (req, res) => {

  // console.log('ping')
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {

    // console.log('user', user)
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      // console.log('err',err)

      // console.log('isMatch',isMatch)

      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

      //비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

//role === 0 , 일반유저 / role === 1, 관리자
app.get('/api/users/auth', auth, (req, res) => { //auth = 미들웨어

  //여기까지 미들웨어를 통과해 왔다는 얘기는 authentication이 true라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })

})

app.get('/api/users/logout', auth, (req, res) => {

  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if(err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})

// localhost:5000에서 호출될 수 있게 해줌
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}!`)
})