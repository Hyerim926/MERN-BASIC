const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { application } = require('express');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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

userSchema.pre('save', function(next){
    var user = this; //User의 스키마 가리킴

    //password 수정 시마다 암호화된 것이 들어갈 수 있도록 조건 걸어줌
    if(user.isModified('password')){
        //비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash //암호화에 성공했으면 password에 hash로 넣어줌
                next()
            })
        })
    } else{
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {

    //plainPassword 1234567    암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    // console.log('user._id', user._id)

    // jsonwebtoken을 이용해서 token을 생성하기 
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token 
    // -> 
    // 'secretToken' -> user._id

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema) //모델

module.exports = { User } // 이 모듈을 다른 곳에서도 쓸 수 있게 설정해줌