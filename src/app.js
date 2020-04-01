const express=require('express')
const hbs=require('hbs')
const path=require('path')
const validator=require('validator')

const app=express()
const port=process.env.PORT || 3030

const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Grocery Mart',
        name:'Rakshita'
    })
})

app.get('/signin',(req,res)=>{
    res.render('signin',{
        title:'Products',
        name:'Rakshita'
    })
})

app.get('/signup',(req,res)=>{
    res.render('signup',{
        title:'Products',
        name:'Rakshita'
    })
})

app.get('/products',(req,res)=>{
    res.render('products',{
        title:'Products',
        name:'Rakshita'
    })
})

app.get('/online_services',(req,res)=>{
    res.render('online_services',{
        title:'Products',
        name:'Rakshita'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Rakshita Jain',
        errorMessage:'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on the port'+port)
})