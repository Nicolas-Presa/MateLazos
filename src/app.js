import express from 'express';
import mongoose from 'mongoose';
import { __DIRNAME } from './utils.js';
import handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';

import productRouter from './routes/products.routes.js'
import viewsRouter from './routes/views.routes.js'
import cartRouter from './routes/carts.routes.js'
import sessionRouter from './routes/sessions.routes.js'


const PORT = 8080;
const app = express();
const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/MateLazos';

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({ 
    store: MongoStore.create({ mongoUrl: MONGOOSE_URL, mongoOptions: {}, ttl: 1800, clearInterval: 5000 }),
    secret: 'Us3RS3cR3T', 
    resave: false, 
    saveUninitialized: false 
}))
app.use(passport.initialize());
app.use(passport.session());


try {
    await mongoose.connect(MONGOOSE_URL)
    app.listen(PORT, () => {
        console.log(`Servidor iniciado en puerto ${PORT}`)
    })
} catch(err) {
    console.log(`No se puede conectar con el servidor de bbdd (${err.message})`)
}

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);
app.use('/', viewsRouter);

app.engine('handlebars', handlebars.engine({helpers: {eq: (v1, v2) => v1 === v2,}}));
app.set('views', `${__DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/static', express.static(`${__DIRNAME}/public`));
