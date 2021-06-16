$(document).ready(function() {
  $('button').click(function() {
    const valueInput = $('input').val();
    if (!validar(valueInput)) {
      alert('El número ingresado aún no tiene un Hero, ingrese sólo números entre el 1 y el 731')
    } else {
      getHero(valueInput);
    };
  });

  function getHero(idDelHero) {
    $.ajax({
        type: 'GET',
        url: "https://us-central1-crud-vue-firebase-3af18.cloudfunctions.net/instrument/superhero/10222760568656845/" + idDelHero,
        success: function(datosHero) {
          const nombreDelHero = datosHero.name;
          const tarjetaDelHeroe = [];
          tarjetaDelHeroe.push(`
          <div class="row no-gutters">
            <div class="col-md-4">
              <img id="heroImagen" src="${datosHero.image.url}" alt="..." class=" w-100">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5" class="card-title">Nombre:  ${nombreDelHero}</h5>
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
          const powertStats = datosHero.powerstats;
          const datePoints = [];
          for (keys in powertStats) {
            datePoints.push({ y: parseInt(powertStats[keys]) || 0, label: keys })
          }
          renderChart(datePoints, nombreDelHero);
          $("#chartContainer").removeClass("d-none");
          $('#tarjertaHeroe').html("");
          $('#tarjertaHeroe').append(tarjetaDelHeroe);
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
const renderChart = (datePoints, nombreDelHero) => {
  var chart = new CanvasJS.Chart("chartContainer", {
    title: {
      text: "Gráfica de tu SuperHero"
    },
    subtitles: [{
      text: `${nombreDelHero}`
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
  });
  chart.render();
};