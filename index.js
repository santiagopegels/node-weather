const { inquirerMenu, pause, readInput } = require('./helpers/inquirer')
const Search = require('./models/search')

const main = async () => {

    let opt
    const search = new Search()

    do {

        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                const place = await readInput('Ciudad: ')
                await search.searchByCity(place)
                break;
            case 2:
                break;
        }

        await pause()

    } while (opt !== 0)
}

main();