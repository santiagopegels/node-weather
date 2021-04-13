const inquirer = require('inquirer')
require('colors')

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Seleccione una opción',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar Ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }
]


const inquirerMenu = async () => {
    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción'.green);
    console.log('==========================\n'.green);

    const { opcion } = await inquirer.prompt(questions)

    return opcion
}

const pause = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ]

    await inquirer.prompt(question)
}

const readInput = async (message) => {

    const question = [
        {
            name: 'description',
            type: 'input',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Ingrese un valor';
                }
                return true
            }
        }
    ]

    const { description } = await inquirer.prompt(question)

    return description
}

const showPlacesList = async (places = []) => {
    const choices = places.map((place, index) => {
        index = `${index + 1}`.green

        return {
            value: place.id,
            name: `${index} ${place.name}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione un lugar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(question)
    return id
}

const checklistTasks = async (tasks = []) => {
    const choices = tasks.map((task, index) => {
        index = `${index + 1}`.green

        return {
            value: task.id,
            name: `${index} ${task.description}`,
            checked: ( task.completeDate ) ? true : false
        }
    })

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question)
    return ids
}

const confirmQuestion = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question)
    return ok
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    showPlacesList,
    confirmQuestion,
    checklistTasks
}