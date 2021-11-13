const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ //스키마
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 스페이스 공간 없애줌
        unique: 1 // 중복 불가
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema) //모델

module.exports = { User } // 이 모듈을 다른 곳에서도 쓸 수 있게 설정해줌