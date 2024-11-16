import { API_KEY, API_URL, LOCATION_API_URL } from "../config/config";

export const fetchWeather = async ({location}) => {
    
    if(!location) return;

    try {
        const response = await fetch(`${API_URL}lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&lang=es`);

        const result = await response.json();

        return result.list.filter((reading) =>
            reading.dt_txt.includes("12:00:00") 
        ).slice(0, 4); 

    } catch (err) {
        console.error(err.message);
        throw new Error('Failed to fetch weather data');
    }
};


export const fetchLocation = async ({city}) => {

    if(!city) return;

    try {
        const response = await fetch(`${LOCATION_API_URL}q=${city}&limit=1&appid=${API_KEY}`);
        const result = await response.json();
        const first = result?.[0];

        if(!first) {
            throw new Error(`Location not found for city: ${city}`);
        }

        const {lon, lat, name, country} = first;

        return {lon, lat, name, country};
    } catch (err) {
        console.error(err.message);
        throw new Error('Failed to fetch location data');
    } 
};


export const fetchLocations = async ({city}) => {

    if(!city) return;

    try {
        const response = await fetch(`${LOCATION_API_URL}q=${city}&limit=10&appid=${API_KEY}`);
        const result = await response.json();

        if(!result || result?.length === 0) {
            throw new Error(`Location not found for city: ${city}`);
        }

        const uniqueLocations = new Set(); 

        return result?.map((location) => {
            const {lon, lat, name, country, state} = location;
            return { lon, lat, name, country, state }
        })
        .filter(({ lon, lat }) => {
            const key = `${lon},${lat}`;
            if (uniqueLocations.has(key)) {
                return false;
            }
            uniqueLocations.add(key); 
            return true;
        });
        
    } catch (err) {
        console.error(err.message);
        throw new Error('Failed to fetch location data');
    } 
};