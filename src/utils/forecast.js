const request = require('request');

const forecast = ( latitude, longitude, callback ) => {

    const url = 'https://api.darksky.net/forecast/3df3bddddea88b91f57e6ddf17bb9cba/' + latitude + ',' + longitude;
    const queryString = '?units=si';
    const weatherQuery = url + queryString;

    request({url: weatherQuery, json: true}, (error, { body }) => {

        if ( error ) { // low level error

            callback( "Unable to connect to weather service!", undefined);

        } else if ( body.error ) { // error in query response

            callback( body.error, undefined);

        } else {

            let message = body.daily.data[0].summary;
            message += ' It is currently ' + body.currently.temperature + ' degrees out';
            message += '.';
            message += ' There is a ' + body.currently.precipIntensity + '\% chance of rain'
            message += '.';

            callback( undefined, message );
        }

    });

};

module.exports = forecast;