import { useState, useEffect } from "react";
import "./App.css";
import { baseURL, apiKey } from "./helpers/constants";

function App() {
  // Usamos useEffect para hacer la llamada solo una vez cuando el componente se monta
  useEffect(() => {
    fetch(`${baseURL}/events.json?classificationName=music&apikey=${apiKey}`)
      .then((response) => response.json()) // Aquí debes invocar json() con los paréntesis
      .then((data) => {
        console.log(data); // Ahora 'data' será un objeto con la respuesta de la API
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // En caso de que haya un error en la petición
      });
  }, []); // El segundo argumento vacío [] asegura que la llamada solo se haga una vez

  useEffect(() => {
    fetch(
      `https://us-west-1.geolocated.io/ip/167.57.148.113?api-key=Pe37sV0kbJ8WLpe.P2kVH2HLAjLt229dfrT2At5r9R1lKpqE`
    )
      .then((response) => response.json()) // Aquí debes invocar json() con los paréntesis
      .then((data) => {
        console.log(data); // Ahora 'data' será un objeto con la respuesta de la API
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // En caso de que haya un error en la petición
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.ipify.org?format=json`)
      .then((response) => response.json()) // Aquí debes invocar json() con los paréntesis
      .then((data) => {
        console.log(data); // Ahora 'data' será un objeto con la respuesta de la API
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // En caso de que haya un error en la petición
      });
  }, []);
  return <></>;
}

export default App;
