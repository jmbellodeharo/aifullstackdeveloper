const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const port = 8888;
const helmet = require('helmet');
const spawn = require("child_process").spawn;
const mongoDB = require( './mongodbf' );
const CRC8 = require('./crc8.js');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

// POST
app.post('/process', function(req, res){
    var fraseAEncriptar = req.body.frase;
    // Obtener los mensajes originales anteriores
    var frases = mongoDB.obtenerTodasFrases(function(err, frases){
        if(err){
          res.status(700);
          res.send("Error con la BBDD");
          res.end();
        }else{
            var crc8Total = 0;
            if(frases.length > 0){
                // Obtener la suma total
                for(var i = 0; i < frases.length;i++){
                    crc8Total += frases[i].crc8;
                }
            }
            // Ejecutar Script
            // Llamada al script con los argumentos
            var process = spawn('python',["./script.py", fraseAEncriptar, crc8Total] );
            
            // Obtención del resultado
            process.stdout.on('data', function(data) { 
                
                var fraseEncriptada = data.toString();

                // Calculo CRC8 del mensaje original
                var byte_array = fraseAEncriptar.split('').map(function(x){return x.charCodeAt(0)});
                var crc8 = new CRC8();
                var checksum = crc8.checksum(byte_array);

                // Guardar frase original, resultado y CRC8 en BBDD
                mongoDB.guardarFrase(fraseAEncriptar, fraseEncriptada, checksum, function(err, resultado){
                    if(err){
                      res.status(700);
                      res.send("Error con la BBDD");
                      res.end();
                    }else{
                      res.status(200);
                      res.send(fraseEncriptada);
                      res.end();
                    }
                });
            })
            process.stderr.on('data', function(data) {
                //En el caso de que haya algún error con el script
                res.status(701);
                res.send("Error con Python");
                res.end();
            })
        }
    }); 
});

// GET
app.get('/history', (err, res) => {
    // Consultar BBDD
    var frases = mongoDB.obtenerTodasFrases(function(err, frases){
      if(err){
          res.status(700);
          res.send("Error con la BBDD");
          res.end();
      }else{
          res.status(200);
          res.json(frases);
          res.end();
        }
      });
});

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	console.log('Escuchando en el puerto ' + port);
});

module.exports = server;