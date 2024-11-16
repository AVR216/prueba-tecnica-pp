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
                setError(error.message);
                setLocations(null);
                throw new Error('An error has ocurred fetching data: ', error.message);
            }
        }, []);

    return { locations, setLocations, getLocations, error }
}