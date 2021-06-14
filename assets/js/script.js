$(document).ready(function() {

  //selecciono accion del boton
  $('button').click(function() {
    //tomo el valor del input y lo almaceno en una variable
    const valueInput = $('input').val();
    //valido el valor del input solo sea numero
    if (!validar(valueInput)) {
      alert('El número ingresado aún no tiene un Hero, ingrese sólo números entre el 1 y el 731')
    } else {
      getHero(valueInput);

    };
  });

  function getHero(idDelHero) {
    //console.log(idDelHero)
    $.ajax({
        type: 'GET',
        url: "https://us-central1-crud-vue-firebase-3af18.cloudfunctions.net/instrument/superhero/10222760568656845/" + idDelHero,
        success: function(datosHero) {
          //console.log(datosHero)
          //llenando tarjeta del heroe con su informacion
          const tarjetaDelHeroe = [];
          tarjetaDelHeroe.push(`
          <div class="row no-gutters">
            <div class="col-md-4">
              <img id="heroImagen" src="${datosHero.image.url}" alt="..." class="img-fluid">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5" class="card-title">Nombre:  ${datosHero.name}</h5>
                <p id="conexiones" class="card-text">Conexiones:  ${datosHero.connections['group-affiliation']}</p>
                <p id="autorPublicado" class="card-text">Publicado por:  ${datosHero.biography.publisher}</p>
                <p id="ocupacion" class="card-text">Ocupación:  ${datosHero.work.occupation}</p>
                <p id="primeraAparicion" class="card-text">Primera Aparición:  ${datosHero.biography['first-appearance']}</p>
                <p id="altura" class="card-text">Altura:  ${datosHero.appearance.height}</p>
                <p id="peso" class="card-text">Peso:  ${datosHero.appearance.weight}</p>
                <p id="alianza" class="card-text">Alianza:  ${datosHero.biography.aliases}</p>
              </div>
            </div>
          </div>
          `)
            //Todo lo del Grafico
          const powertStats = datosHero.powerstats;
          const datePoints = [];
          for (keys in powertStats) {
            datePoints.push({ y: parseInt(powertStats[keys]) || 0, label: keys })
          }
          //console.log(datePoints);
          var graficostatHero = {
            title: {
              text: "Gráfica de tu SuperHero"
            },
            subtitles: [{
              text: `${datosHero.name}`
            }],
            animationEnabled: true,
            data: [{
              type: "pie",
              startAngle: 40,
              toolTipContent: "<b>{label}</b>: ({y})",
              showInLegend: "true",
              legendText: "{label}",
              indexLabelFontSize: 20,
              indexLabel: "{label} - ({y})",
              dataPoints: datePoints
            }]
          }; //fin grafico

          //ocultamos el grafico en pantalla principal
          $("#chartContainer").removeClass("d-none");
          //agregamos el grafico a la pantalla
          $("#chartContainer").CanvasJSChart(graficostatHero);
          //dejamos tarjeta del heroe vacia, para que al cargar unno nuevo solo quede 1 en pantalla
          $('#tarjertaHeroe').html("");
          //mostramos los datos del heroe en pantalla
          $('#tarjertaHeroe').append(tarjetaDelHeroe);
          //$('.imagenPrimeraPantalla').remove();
          //ocultamos la card en pantalla principal
          $("#tarjertaHeroe").removeClass("d-none");
        },
        dataType: 'json',
        error: function(data) {
          console.log(data)
          alert('error con la petición');
        },

      }) //fin conecion ajax api
  }; //fin funcion getHEro
})

const validar = (datoIngresado) => {
  var permitido = /[^0-9]/g;
  if (datoIngresado.match(permitido) || datoIngresado > 731) {
    return false
  } else {
    return true
  }
}

//funciona, deja en objet object los objetos anidados
// $.each(datosHero, function(key, value) {
//   const valoresDeCadaKey = (typeof datosHero[keys]) === "object" ? value.map((valores) => valores).join() : value;
//   console.log(valoresDeCadaKey)
//   const labelYsuValor = key + ": " + valoresDeCadaKey;

//   $('#informacionDelHero').append(`${labelYsuValor} <br>`)
//   //console.log(key + " : " + value);
// })


// for (keys in datosHero) {
//   if ((typeof datosHero[keys]) === "object") {
//     console.log("aqui", datosHero[keys])
//   }
//   todosLosDatosDelHero.push(datosHero[keys])
// }
// console.log(todosLosDatosDelHero)