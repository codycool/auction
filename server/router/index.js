
module.exports =  (app) => {

    app.get('/', function (req, res) {
        res.send('Hello World!');
    });
    app.use('/v1/signup', require('./v1/auth/signup'));
    app.use('/v1/signin',require('./v1/auth/signin'));
    app.use('/v1/verifyToken'require('./v1/auth/verifyToken'));
    app.use('/v1/forgot-password',require('./v1/auth/forgot-password'));
    app.use('/v1/account-setting',require('./v1/auth/account-setting'));
    app.use('/v1/goods',require('./v1/goods/goods'));
  

  // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
        res.status(404).send('404');
        }
    });
  
  
};