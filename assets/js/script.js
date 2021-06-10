$(document).ready(function() {

  //selecciono accion del boton
  $('button').click(function() {
    //tomo el valor del input y lo almaceno en una variable
    let valueInput = $('input').val();
    //valido el valor del input solo sea numero
    validar(valueInput);

    $.ajax({
      type: 'GET',
      url: `https://us-central1-crud-vue-firebase-3af18.cloudfunctions.net/instrument/superhero/10222760568656845/${valueInput}`,
      success: function(datosHero) {
        const imagenHero = datosHero.image.url;
        $('#heroImagen').attr("src", imagenHero);
        console.log(datosHero)
        const powertStats = datosHero.powerstats;
        const datePoints = [];
        for (keys in powertStats) {
          datePoints.push({ y: parseInt(powertStats[keys]) || 0, label: keys })
        }
        console.log(datePoints);
        //renderChart(dataPoints);
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
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: datePoints
          }]
        };

        const todosLosDatosDelHero = [];

        $("#chartContainer").CanvasJSChart(graficostatHero);


        $('#mostrarHeroe').append(datosHero);
        $('.imagenPrimeraPantalla').remove();

      },
      dataType: 'json',
      error: function(data) {
        //esta función se activa si ocurre algún error durante el proceso
      },


    });
  });
})

const validar = (datoIngresado) => {
  var permitido = /[^0-9]/g;
  if (datoIngresado.match(permitido)) {
    alert('Sólo ingrese Números')
  } else {
    console.log(datoIngresado)
  }
}