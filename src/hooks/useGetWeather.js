import { useCallback, useState } from "react";
import { fetchWeather } from "../services/weather";

export function useGetWeather() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const getData = useCallback(
        async ({location}) => {
            try {
                const newData = await fetchWeather({location});
                setData(newData);
            } catch (error) {
                setError(error.message);
                setData([]);
                throw new Error('An error has ocurred fetching data: ', error.message);
            }
        }, []);


    return { data, getData, error };
}