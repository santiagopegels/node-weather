require('dotenv').config()

const { inquirerMenu, pause, readInput, showPlacesList } = require('./helpers/inquirer')
const Search = require('./models/search')

const main = async () => {

    let opt
    const search = new Search()
    search.readDB()
    do {

        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                const term = await readInput('Ciudad: ')
                const places = await search.searchByCity(term)
                const idSelected = await showPlacesList(places)
                if (idSelected === '0' ) continue;
                const placeSelected = places.find(place => place.id === idSelected)
                search.addHistoric( placeSelected.name)
                const weather = await search.weatherPlace(placeSelected.lat, placeSelected.lng)

                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad:', placeSelected.name)
                console.log('Latitud:', placeSelected.lat)
                console.log('Longitud:', placeSelected.lng)
                console.log('Temperatura:', weather.temp)
                console.log('Mínima:', weather.min)
                console.log('Máxima:', weather.max)
                console.log('Cómo está el clima?:', weather.description)

                break;
            case 2:
                search.historicCapitalize.forEach( (place, index) => {
                    index = `${index + 1}`.green

                    console.log(`${index} ${place}`)
                })
                break;
        }

        await pause()

    } while (opt !== 0)
}

main();