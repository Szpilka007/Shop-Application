const express = require('express');
const app = express();

// ustawienie odpowiedzi na żądanie na adres http://localhos:8080
app.get('/', function(req,res){
    res.json({
        'status' : `Working!`,
    });
});

// uruchomienie serwera na porcie 8080
app.listen(8080, function() {
    console.log('Product service is listening!');
})
