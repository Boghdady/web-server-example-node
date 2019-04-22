const request = require('request')

// get weather data using long and lat after refactoring
const forcast = (latitude , longitude , callback) => {
    const url = 'https://api.darksky.net/forecast/70617eccf8f99deb8d6975122c6cbe28/'+latitude+','+longitude+''
    request({ url, json: true } , (error, {body}) => {
        if(error) {
            callback('Unable to connect weather service' , undefined)
        } else if (body.error) {
            callback('Unable to find loaction', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary ,
                temperatureLow: body.daily.data[0].temperatureLow
            })
        }
    })
}

module.exports = forcast