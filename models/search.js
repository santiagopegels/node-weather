const axios = require('axios')

class Search {


    historial = []

    constructor() {

    }

    get paramsMapbox(){
        return {
            'access_token':'pk.eyJ1Ijoic2FudGlhZ29wZWdlbHMiLCJhIjoiY2tuZ2E0ZjA5MGVmYzJ3cDU5OGVsajlqYiJ9.goHuwsixWgyeXK1sZKyVQQ',
            'limit':5,
            'language':'es'
        }
    }

    async searchByCity(place = '') {
        try {
            const axiosInstance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            })

            const resp = await axiosInstance.get()
            console.log(resp.data)
        } catch (error) {
            return 'algo salio mal'
        }
    }
}

module.exports = Search