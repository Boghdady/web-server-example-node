const path = require('path')
const express = require('express')
const hbs = require('hbs') // handlebars (hbs) 1- allows us to render dynamic document. 2- render dynamic element

const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Mahmoud Bake Home'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ahmed Boghdady about'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Omar Osama About'
    })
})



app.get('/weather', (req, res) => {

    // query string
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}= {} ) => {
        if (error) {
            return res.send({ error })
        }
        forcast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address

            })

        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Omar Osama',
        errorMessage: 'Help article not found'
    })
})

// url not match with anything
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Ahmed Boghdady',
        errorMessage:'Page not found'
    })
})

// start the server
app.listen(port, () => {
    console.log('Server is up in port server port or 3000')
})

