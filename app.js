require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const cookieParser = require('cookie-parser');
const todosRouter = require('./controllers/todos');
const userExtractor = require('./middlewares/auth');
const logOutRouter = require('./controllers/logout');
const resetRouter = require('./controllers/reset');
const { MONGO_URI } = require('./config');
const finishRouter = require('./controllers/emailFinish');
const actionRouter = require('./controllers/actions');
const modelosRouter = require('./controllers/modelos');



(async () => {
    try {
       await mongoose.connect(MONGO_URI);
       console.log('conecto a mongodb'); 
    } catch (error) {
        console.log(error);
        console.log('no se pudo establecer coneccion con mongodb');
    }
})();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Frontend routes
// app.use('/', express.static(path.resolve('views', 'home')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/', express.static(path.resolve('views', 'login')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/images', express.static(path.resolve('img')));
app.use('/signup', express.static(path.resolve('views', 'admin', 'createNewUser')));
app.use('/admin/newWork', express.static(path.resolve('views', 'app', 'admin', 'newWork')));
app.use('/app/:id', express.static(path.resolve('views', 'app', 'admin', 'pagPrincipal')));
app.use('/admin/profiles', express.static(path.resolve('views', 'app', 'admin', 'profiles')));
app.use('/admin/works', express.static(path.resolve('views', 'app', 'admin', 'works')));
app.use('/admin/addWorks', express.static(path.resolve('views', 'app', 'admin', 'addWorks')));
app.use('/admin/addMarca', express.static(path.resolve('views', 'app', 'admin', 'addMarca')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));
app.use('/reset-password', express.static(path.resolve('views', 'reset')));
app.use('/newpassword', express.static(path.resolve('views', 'newpassword')));
app.use('/prueba', express.static(path.resolve('views', 'prueba')));
app.use('/utils', express.static(path.resolve('views', 'utils')));




// Middlewares backend
app.use(morgan('tiny'));


// Backend routes
app.use('/api/users',userExtractor, userRouter);
app.use('/api/login', loginRouter);
app.use('/api/todos', userExtractor, todosRouter);
app.use('/api/logout', logOutRouter);
app.use('/api/reset', resetRouter);
app.use('/api/email', userExtractor, finishRouter);
app.use('/api/actions', userExtractor, actionRouter);
app.use('/api/modelos', userExtractor, modelosRouter);




app.use('*', express.static(path.resolve('views', '404')));


module.exports = app;