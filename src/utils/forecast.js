const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f0a7699d95294314c369fcdde961aa11&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            var forecastMessage = body.current.weather_descriptions[0]  + '. It is currently '
            forecastMessage = forecastMessage + body.current.temperature + ' degrees out.  It feels like '
            forecastMessage = forecastMessage + body.current.feelslike + ' degrees out.'
            forecastMessage = forecastMessage + '  Humidity is ' + body.current.humidity + "."
            forecastMessage = forecastMessage + '  Visibity is ' + body.current.visibility + "."
            
            callback(undefined, forecastMessage)
            // callback(undefined, body.current.weather_descriptions[0]  + '. It is currently ' + body.current.temperature + ' degrees out.  It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast