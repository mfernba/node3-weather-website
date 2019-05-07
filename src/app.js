const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for express config...
const publicFolderPath = path.join( __dirname, '../public' );
const viewsFolderPath = path.join( __dirname, '../templates/views');
const partialsFolderPath = path.join( __dirname, '../templates/partials');

// Setup handlebars engine...
app.set( 'view engine', 'hbs' );
app.set( 'views', viewsFolderPath );
hbs.registerPartials( partialsFolderPath );

// Setup static folder to serve...
app.use( express.static( publicFolderPath ) );

app.get('', ( req, resp ) => {

    resp.render('index', {
        headerSectionTitle: 'Weather',
        title: 'Weather',
        name: 'Manuel'
    });

});

app.get('/about', ( req, resp ) => {

    resp.render('about', {
        headerSectionTitle: 'About',
        title: 'About Me',
        name: 'Manuel'
    });

});

app.get('/help', ( req, resp ) => {

    resp.render('help', {
        headerSectionTitle: 'Help',
        title: 'Help',
        name: 'Manuel',
        helpText: 'Help!'
    });

});

app.get('/weather', ( req, resp ) => {

    if (!req.query.address) {

        return resp.send( { error: 'No address provided' });

    }

    geocode(req.query.address, ( error, { latitude, longitude, location } = {} ) => {

        if ( error ) {

            return resp.send( { error: error });

        }

        forecast( latitude, longitude, ( error, forecastData ) => {

            if ( error ) {

                return resp.send( { error: error });
    
            }

            resp.send( {

                forecast: forecastData,
                location: location,
                address: req.query.address

            });
                    
        });

    });  

});

// Error routing handling...

app.get('/help/*', ( req, resp ) => {

    resp.render('error', {
        headerSectionTitle: '404',
        title: '404 page not found',
        name: 'Manuel',
        errorMessage: 'Help article not found'
    });

});

app.get('*', ( req, resp ) => {

    resp.render('error', {
        headerSectionTitle: '404',
        title: '404 page not found',
        name: 'Manuel',
        errorMessage: 'Page not found'
    });

});

app.listen( 3000, () => {

    console.log( 'Server is up on port 3000' );

});