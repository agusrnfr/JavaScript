const LIMIT = 15;

const LINK = "https://pokeapi.co/api/v2/pokemon/";

const COUNT = 1126;

let page = 0;

var intervalo;

window.addEventListener("load", getApi(page))

function borrar(id) {
    while (id.firstChild != null) {
        id.removeChild(id.firstChild);
    }
}

//PAGINACION

function ant() {
    const LIST = document.getElementById("list");
    if (page > 0) {
        page--;
        borrar(LIST);
        getApi(page);
        console.clear();
    }
}

function sig() {
    const LIST = document.getElementById("list");
    if (page <= (COUNT / LIMIT) - 1) {
        page++;
        borrar(LIST);
        getApi(page);
        console.clear();
    }
}

//MOSTRAR POKEMON

function showPokemon(datos) {
    const especie = document.getElementById('especie');
    const habilidades = document.getElementById('habilidades');
    const tipos = document.getElementById('tipos');
    const peso = document.getElementById('peso');
    const altura = document.getElementById('altura');
    const imagen = document.getElementById('imagen');
    let girar = false;

    document.getElementById('stats').hidden = false;
    document.getElementById('tituloHabilidades').hidden = false;
    document.getElementById('tituloTipos').hidden = false;

    borrar(tipos);
    borrar(habilidades);

    //ESPECIE

    especie.innerHTML= datos.name.toUpperCase();

    //HABILIDADES

    for (let i = 0; i < 3; i++) {
        if (datos.abilities[i] != null) {
            let li = document.createElement('li');
            li.className = "info";
            li.innerHTML = datos.abilities[i].ability.name.toUpperCase();
            habilidades.appendChild(li);
        }
    }

    //TIPOS

    for (let i = 0; i < 3; i++) {
        if (datos.types[i] != null) {
            let li = document.createElement('li');
            li.className = "info";
            li.style.backgroundColor = liTypeColor(datos.types[i].type.name);
            li.innerHTML = datos.types[i].type.name;
            tipos.appendChild(li);
        }
    }

    //PESO Y ALTURA

    peso.innerHTML = 'PESO ' + datos.weight + ' kg';
    altura.innerHTML = 'ALTURA ' + datos.height + '0 cm';

    //IMAGEN

    imagen.hidden = false;

    if (intervalo != undefined) {
        clearInterval(intervalo)
    }
    imagen.src = datos.sprites.front_default;
    intervalo = setInterval(function () {
        if (girar) {
            imagen.src = datos.sprites.front_default;
            girar = false;
        }
        else {
            imagen.src = datos.sprites.back_default;
            girar = true;
        }
    }, 1000)
}

function getPokemon(event) {
    let pokemon = event.target.id;
    fetch(LINK + pokemon)
        .then(res => res.json())
        .then(datos => showPokemon(datos))
        .catch(err => console.log(err))
}

//LISTAR POKEMONS

function show(element) {
    const LIST = document.getElementById("list")
    let li = document.createElement('li');
    li.innerHTML = "=>" + element.name;
    LIST.appendChild(li);
    li.setAttribute("id", element.name);
    li.addEventListener("click", getPokemon);
}

function getApi(page) {
    let offset = page * LIMIT;
    fetch(LINK + "?offset=" + offset + "&limit=" + LIMIT)
        // fetch(${LINK}?offset=${offset}&limit=${LIMIT})
        .then(res => res.json())
        .then(datos => datos.results.forEach(element => show(element)))
        .catch(err => console.log("ERROR"));
}

//COLOR FONDO LI SEGUN TIPO

function liTypeColor(type) {
    let color;
    switch (type) {
        case "fire":
            color = '#ff714a';
            break;
        case "grass":
            color = '#BDFFA3';
            break;
        case "electric":
            color = '#fed16b';
            break;
        case "water":
            color = '#5CACFF';
            break;
        case "ground":
            color = '#5a3b07';
            break;
        case "rock":
            color = '#d5d5d4';
            break;
        case "fairy":
            color = '#fceaff';
            break;
        case "poison":
            color = '#008125';
            break;
        case "bug":
            color = '#f1ab46';
            break;
        case "dragon":
            color = '#97b3e6';
            break;
        case "psychic":
            color = '#803696';
            break;
        case "flying":
            color = '#F5F5F5';
            break;
        case "fighting":
            color = '#E6E0D4';
            break;
        case "normal":
            color = '#F5F5F5';
            break;
        case "ice":
            color = '#99FFFF';
            break;

    }
    return color;
}

