const express = require('express') // express module 가져옴
const app = express() //function을 이용해 새로운 app을 만듦
const port = 5000 //port 번호
// const bodyParser = require('body-parser');
const { User } = require("./models/User");

const config = require("./config/key");

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.use(express.json()) //For JSON Requests, application/json
app.use(express.urlencoded({extended: true})); //application/x-www-form-urlencoded


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


// 루트 디렉토리에 오면 Hello World 출력
app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요!')
})

// 회원가입 창
app.post('/register', (req, res) => {

  //회원 가입할 떄 필요한 정보들을 client에서 가져오면 
  //그것들을 데이터 베이스에 넣어줌
  const user = new User(req.body)

  user.save((err, userInfo) => { //save() = mongodb 메서드
    if(err) return res.json({success: false, err})
    return res.status(200).json({ //200코드는 전송에 성공했다는 의미
      success: true
    })
  }) 
})

// localhost:5000에서 호출될 수 있게 해줌
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}!`)
})