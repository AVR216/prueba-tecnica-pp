import { useEffect } from "react";
import { useGetWeather } from "../../hooks/useGetWeather";

import './Weather.css';
import { kelvinToCelsius } from "../../utils/temperature/temperature";

export function Weather({ selectedLocation }) {

    useEffect(() => {
        getData({location: selectedLocation});
    }, [selectedLocation])

    const { data, getData } = useGetWeather();

    
    if(!selectedLocation) {
        return(
            <section>
                <h1>No hay contenido disponible</h1>
            </section>
        )
    }



    return(
        <section>
            <h3>
                {selectedLocation.name} - {selectedLocation.country} 
                {selectedLocation.state ? `, ${selectedLocation.state}` : ''} ☂️
            </h3>
            <div className="card-container">
                {data?.map((weather, index) => (
                    <article className="card" key={index}>
                         <img src={
                            weather?.weather?.[0]?.description.includes('lluvia') ?
                            'src/assets/lluvia.jpg' : 'src/assets/soleado.jpg'
                        } alt="imagen representativa" />
                        <h4>Fecha: {weather?.dt_txt.substring(0, 10)}</h4>
                        <p>Clima principal: {weather?.weather?.[0].description}</p>
                        <p>Temperatura max: {kelvinToCelsius({kelvin: weather?.main?.temp_max})} °C
                        </p>
                        <p>Temperatura min: {kelvinToCelsius({kelvin: weather?.main?.temp_min})} °C</p>
                    </article>
                ))}
            </div>
        </section>
    )
}