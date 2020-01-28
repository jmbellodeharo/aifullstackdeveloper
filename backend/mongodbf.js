const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://localhost:27017";
const bbdd = "frases"
const coleccion = "frasesColl"

var _db;

module.exports = {

  // Obtención de todos los documentos de la colección "frasesColl"
  obtenerTodasFrases: function( callback ) {
    MongoClient.connect( url, { useNewUrlParser: true, useUnifiedTopology: true }, function( err, db ) {
      if (err) {
        return callback( err, null );
      }
      var dbo = db.db(bbdd);
      dbo.collection(coleccion).find({}).toArray(function(err, result) {
        if (err){
          return callback( err, null );
        };
        db.close();
        return callback( null, result );
      });
    } );
  },

  //Guardado de un documento en la colección "frasesColl"
  guardarFrase: function( fraseAEncriptar, fraseEncriptada, crc8, callback ) {
    MongoClient.connect( url, { useNewUrlParser: true, useUnifiedTopology: true }, function( err, db ) {
      if (err) {
        return callback( err );
      }
      var dbo = db.db(bbdd);
      var myobj = { original: fraseAEncriptar, encriptada: fraseEncriptada, crc8: crc8 };
      dbo.collection(coleccion).insertOne(myobj, function(err, result) {
        if (err){
          return callback( err, null );
        }
        db.close();
        return callback( null, result )
      });
    });
  }
};