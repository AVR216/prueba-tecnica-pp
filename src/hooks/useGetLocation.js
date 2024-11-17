import { useCallback } from "react";
import { useState } from "react";
import { fetchLocations } from "../services/weather";

export function useGetLocation() {

    const [locations, setLocations] = useState(null);
    const [error, setError] = useState('');

    const getLocations = useCallback(
        async ({city}) => {
            try {
                const newLocations = await fetchLocations( {city} );
                setLocations(newLocations);
            } catch (error) {
                setError("Ciudad no encontrada");
                setLocations(null);
                console.error(error.message);
            }
        }, []);

    return { locations, setLocations, getLocations, error, setError }
}