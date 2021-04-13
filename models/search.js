const axios = require('axios')

class Search {


    historial = []

    constructor() {

    }

    get paramsMapbox(){
        return {
            'access_token':process.env.MAPBOX_KEY,
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
        
            return resp.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }))

        } catch (error) {
            return 'Error Response'
        }
    }
}

module.exports = Search