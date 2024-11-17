export function kelvinToCelsius({kelvin}) {
    try {
        const celsius = kelvin - 273.15;
        return parseFloat(celsius.toFixed(3));
    } catch (error) {
        console.log(error.message);
        throw new Error('Error parsing kelvin to celsius');
    }
}