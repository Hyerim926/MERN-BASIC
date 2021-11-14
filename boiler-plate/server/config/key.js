if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod'); //배포 시 쓸 파일
} else{
    module.exports = require('./dev'); //개발 시 쓸 파일
}