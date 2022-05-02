const express = require('express')
app = express()

const port = 3000

var path = require('path');

const parser = require('body-parser')

app.use(parser.urlencoded({extended: true}))
app.set('view engine', 'ejs');

const knex = require('knex')({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '010227',
    database : 'myapp_test'
    }
});

knex.schema.dropTableIfExists('users')
    .then(() => console.log("Dropped 'users'"))

setTimeout(() => {

    //Route create
    knex.schema.createTable('users', (table) => {
            table.string('email').primary,
            table.string('password')
        })
        .then(() => console.log("Successfuly created !"))
        .catch((error) => console.log(error))

    //Route insert
    knex('users')
        .insert([
            { email: 'person1@example.com', password : 'adkieom345' },
            { email: 'maxime.laze@efrei.net', password : 'okasbiz179' },
            { email: 'alina.castellan@efrei.net', password : 'okdpamshd953' },
            { email: 'rose.chambon@efrei.net', password : '3281oahdpa' },
            { email: 'romane.simonet@efrei.net', password : '92oaisnep' },
            { email: 'rayan.lounis@efrei.net', password : '91JNS23' }
        ])
        .then(() => console.log("insered"))

    //Route select  
    knex('users')
        .where({ email: 'person1@example.com' })
        .then((rows) => console.log(rows))

    //Route update
    knex('users')
        .where({ email: 'person1@example.com', password : 'adkieom345' })
        .update({ email: 'priscilla.huang@efrei.net' })
        .then((rows) => console.log( "success : " , rows))

    //Route delete
    knex('users')
        .where({ email : 'rayan.lounis@efrei.net' })
        .del()
        .then((rows) => console.log( "success : " , rows))
    
}, 500);


app.get("/", (req, res) => {
    res.render(path.join(__dirname, 'templates/index'), {val:"Register"})
})

app.post('/insertUser', (req, res) => {
    console.log(req.body)
    knex('users')
        .insert([
            {email: req.body.email, password: req.body.pwd}
        ])
        .then(() => console.log("insered"))
        .catch((error) => console.log(error))
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})