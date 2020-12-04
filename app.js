const colors = require('colors');
const { argv } = require('./config/yargs');
const file = require('./buscador/ciudad');
const { find, save } = require('./buscador/buscar');


let command = argv._[0];
let path = argv.archivo
let country = argv.pais
let year = argv.anio

file.importData(path)
    .then(data => {
        switch (command) {
            case 'mostrar':
                let myData = find(data, country, year)
                console.log(`           ${myData.title}          `.bgGreen)
                console.log('****************************************'.green)
                console.log('Nombre: '.cyan,(myData.name))
                console.log('Codigo: '.cyan,(myData.code).green)
                console.log('Anio: '.cyancyan, (myData.year))
                console.log('Valor: '.cyan, (myData.value))
                break;

            case 'guardar':
                let myData2 = find(data, country, year)
                save(myData2)
                    .then(path => {
                        console.log('Archivo guardado exitosamente: '.magenta, (path))
                    })
                    .catch(err =>
                        console.log('Error al escribir archivo'.red, err))
                break;

            default:
                console.log('Comando no valido.'.bgYellow)
                break;
        }
    })
    .catch(console.log)
