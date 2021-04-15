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

    get paramsOpenweather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
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

    async weatherPlace(lat, lon) {
        try {
            
            const axiosInstance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.paramsOpenweather,
                    lat,
                    lon,
                }
            })

            const resp = await axiosInstance.get().catch(error => console.log(error))

            const {weather, main} = resp.data
            console.log(resp)
            return {
                description: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }
        } catch(error){
            return error
        }
    }
}

module.exports = Search