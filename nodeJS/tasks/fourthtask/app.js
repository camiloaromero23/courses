const express = require('express')

const bodyParser = require('body-parser')

const app = express();

const users = [];

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/',(request,response)=>{
	response.render('index',{
		pageTitle:'Add User'
	})
})
app.get('/users',(request,response)=>{
	response.render('users',{
		pageTitle:'Users',
		users
	})
})
app.post('/add-user',(request,response)=>{
	users.push({name:request.body.username})
	console.log(users)
	response.redirect('users')
})


app.listen(3000)
