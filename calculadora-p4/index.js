const express = require('express');
const app = express();
const PORT = 8000;
const fs = require('fs');
const { query, validationResult } = require('express-validator');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

function parsearArchivo() {
    let archivojson = fs.readFileSync(__dirname + '/private/BLS_CPI.json')
    return JSON.parse(archivojson)
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/calcular', [
    query('meses1', 'Error en el primer mes').isInt({ min: 1, max: 12 }),
    query('meses2', 'Error en el segundo mes').isInt({ min: 1, max: 12 }),
    query('anio1', 'Error en el primer año').isInt({ min: 1913, max: 2022 }),
    query('anio2', 'Error en el segundo año').isInt({ min: 1913, max: 2022 }),
    query('dolar', 'Error en los dolares').isInt({ min: 0 })
]
    , (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ errors: errors.array() });
        }
        else {
            let blscpi = parsearArchivo()
            let meses1 = req.query.meses1
            let meses2 = req.query.meses2
            let anio1 = req.query.anio1
            let anio2 = req.query.anio2
            let dolares = req.query.dolar
            let valorFecha1 = blscpi.find(function (date) {
                return date.year == anio1 && date.month == meses1
            })
            let valorFecha2 = blscpi.find(function (date) {
                return date.year == anio2 && date.month == meses2
            })
            let resultado = (dolares / valorFecha1.value * valorFecha2.value).toFixed(2)
            let porcentaje = (((valorFecha2.value - valorFecha1.value) / valorFecha1.value) * 100).toFixed(2)

            let objeto = {
                resultado: resultado,
                porcentaje: porcentaje
            }
            res.json(objeto)
        }
    }
)

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));