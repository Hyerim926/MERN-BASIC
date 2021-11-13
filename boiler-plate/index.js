const express = require('express') // express module 가져옴
const app = express() //function을 이용해 새로운 app을 만듦
const port = 5000 //port 번호

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://youtube:youtube@youtubeclone.nlzoz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


// 루트 디렉토리에 오면 Hello World 출력
app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요!')
})

// localhost:5000에서 호출될 수 있게 해줌
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})