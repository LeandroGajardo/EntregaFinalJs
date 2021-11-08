$(document).ready(() => {

// ----- Entidades -----

class Usuario {
    constructor(nombre, apellido, email){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }
}

class Postulante {
    constructor(tipo, turno, pais, ciudad, fecha, empresa, area, sueldo){
        this.tipo = tipo;
        this.turno = turno;
        this.pais = pais;
        this.ciudad = ciudad;
        this.fecha = fecha;
        this.empresa = empresa;
        this.area = area;
        this.sueldo = sueldo;
    }
}

// ----- Variables -----

let usuarios = [];
let postulantes = [];
let sueldo = 0;
var select = $('#pais');

// ----- Funciones -----

// Función para guardar los datos del usuario

function guardarUsuario() {
    let nombre = $("#nombre").val();
    let apellido = $("#apellido").val();
    let email = $("#email").val();
    let usuario = new Usuario(nombre, apellido, email);

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Función para imprimir el nombre del usuario

function imprimirUsuario() {
    let imprimirUsuario = JSON.parse(localStorage.getItem("usuarios"));

    if (imprimirUsuario != null) {

        imprimirUsuario.forEach(elemento => {

            $('#dataUsuario').append(
                `
                <div class="float-end usuario">
                    <img class="iconoUsuario" src="css/img/login.png" alt="">
                    <p>${elemento.nombre} ${elemento.apellido}</p>
                </div>
                `
            )
        }
    )} else {
        console.log("El Array está vacío");
    }
}

// Función para guardar los datos del postulante

function guardarPostulante() {
    let tipo = $("#tipoContrato").val();
    let turno = $("#turno").val();
    let pais = $("#pais").val();
    let ciudad = $("#ciudad").val();
    let fecha = $("#fecha").val();
    let empresa  = $('input[name="empresa"]:checked').val();
    let area = $('input[name="area"]:checked').val();

    if (tipo === "Full-time") {
        sueldo = 600000;
        turno = "Am";
        empresa = "Zara";
        area =  "Fashion";
        
        
    } else {
        if ((turno === "Am") || (turno === "Pm")) {
            sueldo = 400000;
            
        } else if (turno === "intermedio") {
            sueldo = 500000;

        } else {
            sueldo = 0;1
            empresa = "No Definido";
            area = "No Definido";
        }
    }

    let postulante = new Postulante(tipo, turno, pais, ciudad, fecha, empresa, area, sueldo);
    postulantes.push(postulante);

    localStorage.setItem("postulantes", JSON.stringify(postulantes));
}

// Función para imprimir el ficha del postulante

function imprimirPostulante() {

    let imprimirPostulante = JSON.parse(localStorage.getItem("postulantes"));

    if (imprimirPostulante != null) {

        imprimirPostulante.forEach(elemento => {

            $("#impresionFinal").append(
                `
                <div class="border border-light shadow-sm p-3 mb-5 bg-white rounded w-100">
                    <h3 class="font-weight-bold">Ficha Postulante</h3>
                    <p>Tipo de Contrato: ${elemento.tipo}</p>
                    <p>Turno: ${elemento.turno}</p>
                    <p>País: ${elemento.pais}</p>
                    <p>Ciudad: ${elemento.ciudad}</p>
                    <p>Fecha de ingreso: ${elemento.fecha}</p>
                    <p>Empresa: ${elemento.empresa}</p>
                    <p>Area: ${elemento.area}</p>
                    <p class="font-weight-bold"> Sueldo $: ${elemento.sueldo}</p>
                    <div class="estiloBoton">
                        <button class="btn boton" id="botonConfirmar">Confirmar Postulacion</button>
                    </div>
                </div>
                `
            )
            
            $("#botonConfirmar").on("click", (e) => {
                e.preventDefault()
                const confirmar = document.querySelector("#impresionFinal");
                confirmar.innerHTML = ''
                const h3 = document.createElement('h3');
                h3.textContent = "Gracias por tu postulacion, te estaremos contactando a la brevedad";
                h3.setAttribute("class", "parrafoFinal");
                confirmar.appendChild(h3);
            })
        })
    } else {
        console.log("El Array está vacío");
    }
}

// Función que deshabilita la opcion de escoger 

function tipoFullTime() {
    let tipoContra = $("#tipoContrato").val();

    if (tipoContra === "Full-time") {
        $("#turno").prop("disabled", true)
        $("#turno").val("Am")
        $("#refTurno").show()
        $("#empresa").hide()
        $("#area").show()

    } else {
        $("#turno").prop("disabled", false)
        $("#refTurno").hide()
        $("#empresa").show()
        $("#area").show()
    }
}

// Funciones para organizar los eventos que ocurren con los clicks de los botones Continuar y Finalizar

function desplegarTexto(e) {
    e.preventDefault()
    guardarUsuario();
    imprimirUsuario();
    $("#botonContinuar").hide();
    $("#tusDatos").show();
}

function finalizarPostulante(e) {
    e.preventDefault()
    guardarPostulante();
    imprimirPostulante();
    $("#DatosPersonales").hide()
    $("#tusDatos").hide();
}

// Funciones para la selección del país en el selector. Uso de API

function seleccionarPais() {
    url = `https://restcountries.com/v3.1/all`;
    $.ajax({
        method: "GET",
        url: url
    }).done(function (data) {
        console.log(data);
        renderPais(data);
        //console.log(data);
        
    }).fail(function (error) {
        console.log(error)
    });
}

if(select.prop) {
  var options = select.prop('options');
}
else {
  var options = select.attr('options');
}
$('option', select).remove();

function renderPais(data) {
    $.each(data, (val, text) => {
        options[options.length] = new Option(text.name,text.name)
    })
}

// ----- Eventos -----

$("#tusDatos").hide();
$("#tipoContrato").change(tipoFullTime);
$("#login").on('submit',desplegarTexto);
$("#datos").on('submit', finalizarPostulante);

// ----- Lógica -----

seleccionarPais()

})



