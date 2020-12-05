//importamos
const { isValid, valAnio } = require('./ciudad');
const { promises: fs, existsSync } = require('fs');
const path = require('path');
const open = require('open');

// validar pais
const find = (data, country = "ECU", year) => {
    let countryCode = country.toUpperCase()
    if (!isValid(countryCode)) {
        throw new Error('Error el pais ingresado es incorrecto.')
    }

    let CiudadF = data.find(country => country['Country Code'] === countryCode)
//validar año
    if (!valAnio(CiudadF, year)) {
        throw new Error('El año ingresado es incorrecto ingrese en el rango de 1960 - 2019');
        
    }

    if (CiudadF[year] === '') {
        value = 'Ingrese un valor.'
    } else {
        value = CiudadF[year]
    }
//valores 
    return {
        name: CiudadF['Country Name'],
        code: CiudadF['Country Code'],
        year: year,
        value
    }
}


const save = async (searchData) => {
    let data = `
    
    Personas que usan Internet (% de la población)  
    ***********************************************
    Nombre: ${searchData.name} 
    Codigo: ${searchData.code}
    Anio:   ${searchData.year}
    Valor:  ${searchData.value}
    ***********************************************
    `
//asyn await
    let appDir = path.dirname(require.main.filename);
    let dir = `${appDir}/resultados`
    let filename = `${appDir}/resultados/${searchData.code}-${searchData.year}.txt`
    if (!existsSync(dir)) {
        await fs.mkdir(dir)
        await fs.writeFile(
            filename,
            data
        )
        await open(filename)
    } else {
        await fs.writeFile(
            filename,
            data
        )
        await open(filename)
    }

    return filename
}

//Exportar modulos
module.exports = {
    find,
    save
}