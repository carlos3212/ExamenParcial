//exportamos
const validCountries = require('./cod.json');
const csvtojson = require('csvtojson');
const { promises: fs } = require('fs');
//lectura csv
const importData = async (file) => {
    const csvFile = await fs.readFile(file, 'utf-8')
        .catch(err => { throw new Error('Error no existe el archivo.') })

    let lines = csvFile.split(/\r?\n/);
    let csvString = ''
    lines.filter((value, index) => {
        if (index >= 4) {
            csvString += value + '\n'
        }
    });

    let csvData = await csvtojson().fromString(csvString);
    if (csvData.length === 0) {
        throw new Error('Error en archivio.')
    }

    csvData = csvData.filter(record => {
        if (isValid(record['Country Code'])) {
            delete record['Indicator Name']
            delete record['Indicator Code']
            delete record['field65']
            return record
        }
    });

    return csvData;
}

// validaciones
const isValid = (countryCode) => {
    const validCodes = validCountries.code;
    let valid = validCodes.includes(countryCode);
    return valid;
}

const valAnio = (country, year) => {
    if (isNaN(year)) {
        throw new Error('El dato es incorrecto ingrese numeros y dentro del rango 1960 - 2019    .')
    }
    let validYears = Object.keys(country)
    validYears = validYears.map(year => +year)
    validYears = validYears.filter(year => !isNaN(year))

    return validYears.includes(year)
}
//Exportar modulos
module.exports = {
    importData,
    isValid,
    valAnio
}