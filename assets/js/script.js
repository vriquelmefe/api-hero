$(document).ready(function() {

  //selecciono accion del boton
  $('button').click(function() {
    //tomo el valor del input y lo almaceno en una variable
    let valueInput = $('input').val();
    //valido el valor del input solo sea numero
    validar(valueInput);

    $.ajax({
      type: 'GET',
      crossDomain: true,
      url: `https://us-central1-crud-vue-firebase-3af18.cloudfunctions.net/instrument/superhero/10222760568656845/${valueInput}`,
      success: function(datosHero) {
        console.log(datosHero)
        let datosSuperHero = [];
        let biografia = [, datosHero.biography[''], ].join()
        datosSuperHero.push(`
          <p>SUPER HERO ENCONTRADO</p>
          <div class="card mb-3 col-lg-4" style="max-width: 560px;">
            <div class="row">
              <div class="col-md-4">
                <img src="${datosHero.image.url}" alt="Imagen Hero" class="img-fluid">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Nombre: ${datosHero.name}</h5>
                  <p class="card-text font-weight-bold">ID: ${datosHero.id} </p>
                  <p class="card-text font-weight-bold">Poderes </p>
                  <p class="card-text">Inteligencia: ${datosHero.powerstats.intelligence}</p>
                  <p class="card-text">strength: ${datosHero.powerstats.strength}</p>
                  <p class="card-text">speed: ${datosHero.powerstats.speed}</p>
                  <p class="card-text">durability: ${datosHero.powerstats.durability}</p>
                  <p class="card-text">power: ${datosHero.powerstats.power}</p>
                  <p class="card-text">combat: ${datosHero.powerstats.combat}</p>
                  <p class="card-text font-weight-bold">Biografia: </p>
                  <p class="card-text">Full-name: ${datosHero.biography['full-name']}</p>
                  <p class="card-text">ALter-egos: ${datosHero.biography['alter-egos']}</p>
                  <p class="card-text">Alias: ${datosHero.biography.aliases}</p>
                  <p class="card-text">place-of-birth: ${datosHero.biography['place-of-birth']}</p>
                  <p class="card-text">first-appearance: ${datosHero.biography['first-appearance']}</p>
                  <p class="card-text">publisher: ${datosHero.biography.publisher}</p>
                  <p class="card-text">first-appearance: ${datosHero.biography.alignment}</p>
                  <p class="card-text font-weight-bold">Appearance:</p>
                  <p class="card-text">Appearance: ${datosHero.appearance.gender}</p>
                  <p class="card-text">race: ${datosHero.appearance.race}</p>
                  <p class="card-text">height: ${datosHero.appearance.height}</p>
                  <p class="card-text">weight: ${datosHero.appearance.weight}</p>
                  <p class="card-text">eye-color: ${datosHero.appearance['eye-color']}</p>
                  <p class="card-text">hair-color: ${datosHero.appearance['hair-color']}</p>
                  <p class="card-text font-weight-bold">work:</p>
                  <p class="card-text">race: ${datosHero.work.occupation}</p>
                  <p class="card-text">race: ${datosHero.work.base}</p>
                  <p class="card-text font-weight-bold">connections:</p>
                  <p class="card-text">race: ${datosHero.connections['group-affiliation']}</p>
                  <p class="card-text">race: ${datosHero.connections.relatives}</p>
                  
                </div>
              </div>
            </div>
          </div>`);

        var options = {
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
            dataPoints: [
              { y: datosHero.powerstats.intelligence, label: "Inteligencia" },
              { y: datosHero.powerstats.strength, label: "strength" },
              { y: datosHero.powerstats.speed, label: "speed" },
              { y: datosHero.powerstats.durability, label: "durability" },
              { y: datosHero.powerstats.power, label: "power" },
              { y: datosHero.powerstats.combat, label: "combat" },
            ]
          }]
        };
        $("#chartContainer").CanvasJSChart(options);


        $('#mostrarHeroe').append(datosSuperHero);

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