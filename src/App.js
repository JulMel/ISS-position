import { useState, useEffect } from "react";

const App = () => {
  const url = "http://api.open-notify.org/iss-now.json";

  const [latitude, setLatitude] = useState(""); // nastavím výchozí šířku na prázdná string
  const [longitude, setLongitude] = useState(""); // nastavím výchozí délku na prázdný string
  const [urlMap, setUrlMap] = useState(""); // nastavím výchozí pozici v mapách na prázdný string

  const getPosition = async () => {
    const response = await fetch(url); // vytáhnu data=odpověď z url jako JSON - počkám na ně
    const data = await response.json(); // uložím je do data a udělám z nich nazpět objekt
    setLatitude(data["iss_position"]["latitude"]); // do setState uložím objekt v objektu - šířku v pozici
    setLongitude(data["iss_position"]["longitude"]); // do setState uložím druhý objekt v objektu

    const iss_lat = data["iss_position"]["latitude"]; // proměnná, která v sobě nese šířku
    const iss_long = data["iss_position"]["longitude"]; // proměnná, která v sobě nese délku
    setUrlMap(`https://mapy.cz/turisticka?x=${iss_lat}&y=${iss_long}&z=6`); // nastavím setUrlMap na odkaz s proměnnými iss_lat a iss_long
  };

  useEffect(() => {
    getPosition();
  }, []); // volám funkci, která se objeví jen jednou

  return (
    <div className="container">
      <div className="iss">
        <h1>ISS</h1>
        <h2>Zeměpisná šířka</h2>
        <p>{latitude}</p>
        <h2>Zeměpisná délka</h2>
        <p>{longitude}</p>
      </div>
      <a href={urlMap} target="_blank">
        Pozice ISS v mapách
      </a>
    </div>
  );
};

export default App;
