import { useEffect } from "react";
import { useGetWeather } from "../../hooks/useGetWeather";

import './Weather.css';

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
                {selectedLocation.state ? `, ${selectedLocation.state}` : ''}
            </h3>
            <div className="card-container">
                {data?.map((weather, index) => (
                    <article className="card" key={index}>
                         <img src={
                            weather?.weather?.[0]?.description.includes('lluvia') ?
                            'src/assets/lluvia.jpg' : 'src/assets/soleado.jpg'
                        } alt="imagen representativa" />
                        <h4>Fecha: {weather?.dt_txt}</h4>
                        <p>Clima principal: {weather?.weather?.[0].description}</p>
                        <p>Temperatura max: {weather?.main?.temp_max}</p>
                        <p>Temperatura min: {weather?.main?.temp_min}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}