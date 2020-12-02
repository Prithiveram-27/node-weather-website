const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Defining paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
  res.render('index',{
    title:"Weather Application",
    name:"Prithiveram"
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:"About",
    name:"Prithive Ram"
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:"HELP",
    name:"Prithive Ram"
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:"You must Provide a address "
    })
  }

  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
      return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastData)=>{
      if(error){
        return res.send({error})
      }

      res.send({
        forecast:forecastData,
        location,
        address:req.query.address
      })
    })
  })

  
})



app.get('/products',(req,res)=>{

  if(!req.query.search){
    return res.send({
      error:"Provide a search term"
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:"404",
    name:"Prithive Ram",
    errorMessage:"Help article Not Found"
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:"Prithive Ram",
    errorMessage:"Page Not Found"
  })
})

app.listen(3000,()=>{
  console.log("server is upto run @ port 3000");
});