import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./style.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  if (loading) {
    return <p>Loading countries...</p>;
  }

  return (
    <div className="App">
      <center>
      <h3>Details</h3>
      <input
        type="text"
        placeholder="Search Countries Name"
        onChange={(e) => setSearch(e.target.value)}
      />
      </center>
      <div class="container">
          <div class="row">
              <table class="table table-bordered" style={{backgroundColor:"#11538b7a"}}>
                <thead>
                    <tr style={{height:"80px",fontSize:"20px"}}>
                     <th>Name</th>
                     <th>Region</th>
                     <th>Sub Region</th>
                     <th>Capital</th>
                     <th>Flag</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCountries.map((country, idx) => (
                     <>
                       <tr key={idx} {...country} />
                       <td style={{width:"250px"}}>{country.name}</td>
                       <td style={{width:"250px"}}>{country.region}</td>
                       <td style={{width:"250px"}}>{country.subregion}</td>
                       <td style={{width:"250px"}}>{country.capital}</td>
                       <td style={{width:"250px"}}><img src = {country.flag} style={{height:"50px"}}></img></td>
                       </>
                    ))}
                </tbody>
              </table>
           </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


    

