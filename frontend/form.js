$( "input[type=submit]" ).click(function( e ) {
    e.preventDefault();
    var valor = e.target.id;
    var url = "http://localhost"
    var puerto = ":8888";
    if(valor == "enviar"){// POST a backend
        var frase = $("#fraseAEncriptar").val();
        console.log(frase.replace(/\s+/g,'').length);
        if(frase.length == 0){
          alert("No has indicado ninguna frase.");
        }else if(frase.replace(/\s+/g,'').length == 0){
          alert("Los espacios no cuentan como frase.");
        }else{
          var endpoint = "/process";
          $.post( url + puerto + endpoint, { frase: frase }, function( data ) {
              $('#fraseEncriptada').text(data);
          });
        }
    }else if(valor == "cargar"){// GET a backend
      var endpoint = "/history";
      $.get( url + puerto + endpoint, function( data ) {
        if(data.length == 0){
          $("table").remove();
          $("#aviso").remove();
          var divAviso = "<div id='aviso'>No hay ninguna frase guardada</div>";
          $(divAviso).appendTo(document.body);
        }else{
          $("#aviso").remove();
          $("table").remove();
          var tabla = "<table class='table'><thead class='thead-dark'><tr><th>Original</th><th>Encriptada</th><th>CRC8</th></tr></thead>";
          for(var i = 0; i < data.length; i++){
            tabla += "<tr><td>" + data[i].original + "</td><td>" + data[i].encriptada + "</td><td>" + data[i].crc8 + "</td></tr>";
          }
          tabla += "</table>";
          $(tabla).appendTo(document.body);
        }
      });
    }
  });