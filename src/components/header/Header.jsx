import './Header.css';

export function Header ({
  city,
  error,
  locations,
  isVisibleDropdown,
  handleSubmit,
  handleChange,
  handleSelect
}) {
  return (
    <header>

        <h1>¿Quieres saber como está el clima en cualquier ciudad?</h1>

        <form onSubmit={handleSubmit} style={{ position: "relative" }} autoComplete="off">
            <input
            type="text"
            name="city"
            placeholder="Ingresa la ciudad..."
            value={city}
            onChange={handleChange}
            />

            <button type="submit">Search</button>

            {locations && isVisibleDropdown && (
            <ul className='dropdown'>
                <h4>Seleccione una ciudad: </h4>
                {locations?.map((location, index) => (
                <li
                    key={index}
                    onClick={() => handleSelect(location)}
                >
                    {location.name} - {location.country}
                    {location.state ? `, ${location.state}` : ""}
                </li>
                ))}
            </ul>
            )}
        </form>
        {error && <p style={{
            color: "#A23"
        }}>{error}</p>}
    </header>
  );
};
