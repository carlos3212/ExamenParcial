const { isValid, valAno } = require('./ciudad');
const { promises: fs, existsSync } = require('fs');
const path = require('path');
const open = require('open');


const find = (data, country = "ECU", year) => {
    let countryCode = country.toUpperCase()
    if (!isValid(countryCode)) {
        throw new Error('Error el pais ingresado es incorrecto.')
    }

    let myCountry = data.find(country => country['Country Code'] === countryCode)

    if (!valAno(myCountry, year)) {
        throw new Error('El año ingresado es incorrecto ingrese en el rango de 1960 - 2019');
        
    }

    if (myCountry[year] === '') {
        value = 'Ingrese un valor.'
    } else {
        value = myCountry[year]
    }


    return {
        title: myCountry['Indicator Name'],
        name: myCountry['Country Name'],
        code: myCountry['Country Code'],
        year: year,
        value
    }
}


const save = async (searchData) => {
    let data = `
    
                    ${searchData.title}
    ***********************************************
    Nombre: ${searchData.name} 
    Codigo: ${searchData.code}
    Anio:   ${searchData.year}
    Valor:  ${searchData.value}
    `

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

module.exports = {
    find,
    save
}