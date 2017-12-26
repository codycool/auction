const auth = require('./auth');

const getCleanUser = (user)=>{
    return {
        id: user.id,
        nickname: user.nickName,
        email: user.email,
        avatar: user.avatar,
    }
}

const checkAuth = async(authorization) => {
    const token = auth.bearerToToken(authorization);
    return await auth.verifyToken(token);
}

module.exports = {
    getCleanUser: getCleanUser,
    checkAuth: checkAuth
}