import { useState } from "react";
import { useGetLocation } from "./hooks/useGetLocation";
import { Weather } from "./components/weather/Weather";
import { Header } from "./components/header/Header";

import './App.css';
import { Footer } from "./components/footer/Footer";

function App() {
  const [city, setCity] = useState('');
  const { locations, getLocations, error: errorLocation, setError: setErrorLocation } = useGetLocation();
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isVisibleDropdown, setVisibleDropdown] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (error || !city) {
      alert('Corrija los errores');
      setSelectedLocation(null);
      return;
    }

    getLocations({ city });
    
    if (errorLocation) {
      setError(errorLocation); 
      setSelectedLocation(null);
      setVisibleDropdown(false);
      return;
    } 

    setVisibleDropdown(true);

  };

  const handleChange = (event) => {
    const value = event.target.value.trim();
    setCity(value);

    if (value.length < 3) {
      setError('La ciudad ingresada debe tener por lo menos 3 caracteres');
      return;
    }
    setError(null);
    setErrorLocation(null);
    setVisibleDropdown(false);
    setSelectedLocation(null);
  };

  const handleSelect = (location) => {
    setSelectedLocation(location);
    setVisibleDropdown(false);
  };

  return (
    <main>
      
      <Header 
        city={city}
        error={error || errorLocation}
        locations={locations}
        isVisibleDropdown={isVisibleDropdown}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleSelect={handleSelect}
      />

      {selectedLocation && !errorLocation &&  <hr />}
     
      {selectedLocation && !errorLocation && <Weather selectedLocation={selectedLocation} />}

      <Footer />

    </main>
  );
}

export default App;
