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
        console.log(datosHero.name, datosHero.powerstats)
        let superHeroes = [];
        // superHeroes.forEach(element => {
        //   console.log(`${element.name} <br> ${element.powerstats} <br> `)

        // });
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