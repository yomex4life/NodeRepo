const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const swwaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

require('dotenv/config');

//middleware
app.use(bodyParser.json());
app.use(cors());

//swagger documentation
const swaggerOptions ={
    swaggerDefinition: {
        info: {
            title: "Customer API",
            description: 'Customer API information',
            contact: {
                name: "Amazing Developer"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["app.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swwaggerUi.serve, swwaggerUi.setup(swaggerDocs));

//IMport routes
const postsRoutes = require('./routes/posts');
app.use('/posts', postsRoutes);
//Routes


/**
 * @swagger
 * /posts:
 *   get:
 *      description: Use to get all posts
 *      responses:
 *          '200':
 *              description: A successful response
 */
app.get('/', function(req, res){
    res.send('We are on home');
});

//connect to DB
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true}, function(){
    console.log('connected');
});

//listen
app.listen(3000);