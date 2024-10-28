const express = require('express');

let app = express();

let user = [
    {
        id: 1,
        ime: 'Mihael',
        prezime: 'Holi'
    },{
        id: 2,
        ime: 'Vanda',
        prezime: 'Rajak'
    },{
        id: 3,
        ime: 'Tin Nanndo',
        prezime: 'Jovanovic'
    }
]

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html');    
});

app.get('/users', (req, res) => {
    res.json(user);
});

app.listen(3000, (error) => {
    
    if(error) {
        console.log('greska');
    } else{
        console.log('slusam');
    }
});