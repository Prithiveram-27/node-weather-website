const request = require('request')


const forecast = (latitude,longitude,callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=727216b15104ac016bf00dae839f07c3&query=http://api.weatherstack.com/current?access_key=727216b15104ac016bf00dae839f07c3&query=' + latitude + ',' +longitude + '&units=f&units=f'

  request({url,json:true},(error,{body}) => {
    if(error){
        callback('Unable to connect with weather service',undefined)
    }else if(body.error){
        callback('Unable to find Location',undefined)

    }else{
      //console.log(body.current.weather_descriptions[0]);
      callback(undefined, body.current.weather_descriptions[0]+" .It is currently " + body.current.temperature + "°F but feelslike " + body.current.feelslike+"°F. The Humidity is"+body.current.humidity+"%.")
    }
  })
}

module.exports = forecast