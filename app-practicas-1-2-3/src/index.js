'use strict';

//se importa express para el servidor
const express = require('express');
const app = express();
const PORT = 3000;

// imporacion de adicionales que se usan
const fs = require('fs'); //para trabajar con el filesystem
const dirTree = require("directory-tree"); // utilizado para 
const path = require('path')

// configuracion de gestor de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');

// configuro express para recibir data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuracion de path a exponer publicamente 
app.use('/s/', express.static(path.join(__dirname, 'public-static')));
app.use('/p/', express.static(path.join(__dirname, '../practicas')));


// inicio del servidor 
app.listen(PORT, () => {
    console.clear();
    console.log('\x1Bc'); //esta linea limpia la pantalla antes de volver a ejectuar la aplicacion por cada cambio
    console.log('\x1b[7m%s\x1b[0m', ' El servidor de JS esta corriendo correctamente          '); 
    console.log('\x1b[7m%s\x1b[0m', ' Ultima actualización a las: '+ new Date().toLocaleTimeString()+'                  \r\n');
    console.log('---------------------------------------------------------')
    console.log('\x1b[34m%s\x1b[0m', 'Acceder desde [Ctrl + Clic ] ==>','\x1b[32m\x1b[0m',` http://localhost:${PORT} \r`);
    console.log('---------------------------------------------------------')
    console.log('\x1b[31m%s\x1b[0m', ' Para salir precione en esta ventana [Ctrl + C ]        \r\n');    
});


// ruta homepage 
app.get('/', (req, res) => {
    // cargo informacion para los links
    let links = JSON.parse(fs.readFileSync('src/data/links.json', 'utf8'));

    // genero tree con los archivos de dentro de PRACTICAS
    let tree = dirTree("./practicas", {
                extensions: /\.(md|js|html|css|jpg|png)$/
            }, 
            (element) => {
                element.path=element.path.replace('practicas', '/p');
                return element;
            }
    );
    res.render('index', {
        year: (new Date()).getFullYear(),
        data: tree.children,
        links: links
    });
});



// app.get('/cpi/:year/:month', (req, res) => {
//     let rawdata = fs.readFileSync('data/bls.json');
//     let blsData = JSON.parse(rawdata);
//     let y = req.params.year;
//     let m = req.params.month;
//     res.json(blsData.find(bls => y == bls.year && m == bls.month) || {});
// });