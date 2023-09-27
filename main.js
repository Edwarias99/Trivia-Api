
import { urlAPI } from "./controllers/controllers.js";
let selectNum = document.getElementById("trivia_amount");
let selectCategoria = document.getElementById("form-control");
let selectDificultad = document.getElementById("selectDificultad");
let selectTipo = document.getElementById("selectTipo");
let btnInicio = document.getElementById("Btn-Inicio");
let btnr0 = document.getElementById("btn-r0")
let btnr1 = document.getElementById("btn-r1")
let btnr2 = document.getElementById("btn-r2")
let btnr3 = document.getElementById("btn-r3")
let Pantalla = document.getElementById("main");
let siguiente = document.getElementById("siguiente");
let cartas = document.getElementById("cards");
let header=document.getElementById("header")

let API = "";
let informacion = "";
let varNext = true;


async function datosParaApi() {
  let dataApi = [
    parseInt(selectNum.value),
    selectCategoria.value,
    selectDificultad.value,
    selectTipo.value,
  ];
  return dataApi;
}


async function cartaPreguntas(informacion) {
  cartas.innerHTML = "";
  for (let i = 0; i < informacion.length; i++) {
  
    let opciones = [];
    let opcionesSort = "";
    
    if ((informacion[i].type = "multiple")) {
      opciones.push(informacion[i].correct_answer);
      for (let a = 0; a < informacion[i].incorrect_answers.length; a++) {
        opciones.push(informacion[i].incorrect_answers[a]);
      }
    }
   

    else {
      opciones.push("False", "True");
    }

    opcionesSort = opciones.sort(function () {
      return Math.random();
    });


    cartas.innerHTML += `
        <div class="barSuper">
        <p class="nomCategoria" >${informacion[i].category}</p>
        <p class="nomdificultad" >Dificultad: ${informacion[i].difficulty}</p> 
        </div>
          <p class="pregunta">${informacion[i].question}</p>`;
      
    for (let i = 0; i < opcionesSort.length; i++) {
      cartas.innerHTML += `   
                  <div class= "botones">
                  <button id="btn-r${i}" 
                  class="nomRespuestas btn btn-outline-light " 
                  value="${opcionesSort[i]}">${opcionesSort[i]}</button>
        </div>
        `;
      
      
    }
   
  }}


btnInicio.addEventListener("click", async function (event) {
  API = await datosParaApi();
  informacion = await urlAPI(API);
  Pantalla.style.display = "flex";
  cartaPreguntas(informacion);
  selectCategoria.value = "any";
  selectDificultad.value = "any";
  selectTipo.value = "any";
});



