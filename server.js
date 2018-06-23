const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');


//Registering the middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    log = `${now}: ${req.url} ${req.method} `;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
        }
    });

    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('BoldText', (text) => {
    return text.toUpperCase();
});

app.get('/',(req, res) => {
    //res.send('<h1>Hello Express !!!</h1>');
    res.send ({
        activity: 'Biking',
        city: 'coimbatore',
        hobbies : [
            'yoga',
            'cycling'
        ]
    });
});

//creating a new Home page
app.get('/home',(req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        WelcomeMessage: 'Welcome to Kriti Creative Solutions',
    });
});

//creating a new About page
app.get('/About',(req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        message: 'We are a bunch of people who are creative in our approach',
    });
});

app.get('/bad',(req, res) => {
   //res.send('You have reached a BAD page !!');
    res.send ({
        ErrorMessage: 'Unable to handle request'
    });
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
