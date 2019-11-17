const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname, __filename);
console.log(path.join(__dirname, '../public'));


//Define path for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');



const app = express();

const port = process.env.PORT || 3000;


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: 'Yura'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: "Yura",
        age: 20,
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Yura',
        mail: "Yura@test.com",
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Invalid address"
        })
    }
    geocode.geoCode(req.query.address, ({
        long,
        lang,
        location
    } = {}, error) => {
        if (error) {
            res.send({
                error
            });
        } else {
            forecast.forecast(long, lang, (forecastData, error) => {
                if (error) {
                    res.send({
                        error
                    });
                } else {
                    res.send({
                        forcast: forecastData,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Invalid search term'
        })
    }

    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('help404', {
        title: '404',
        name: "Yura",
        errorMessage: "Not found"
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Yura",
        errorMessage: "Not found"
    })
})



app.listen(port, () => {
    console.log('Start serve');
})