import React, { useState, useEffect } from "react";

const SaltSuggestions = () => {
  const [query, setQuery] = useState("paracetamol");
  const [saltSuggestions, setSaltSuggestions] = useState([]);
  const [strength, setStrength] = useState();
  const [showitem, setShowitem] = useState();

  const [packing, setPacking] = useState();

  useEffect(() => {
    const fetchSaltSuggestions = async () => {
      try {
        const response = await fetch(
          `https://backend.cappsule.co.in/api/v1/new_search?q=${encodeURIComponent(
            query
          )}&pharmacyIds=1,2,3`
        );
        const data = await response.json();
        setSaltSuggestions(data.data.saltSuggestions);
      } catch (error) {
        console.error("Error fetching salt suggestions:", error);
      }
    };

    fetchSaltSuggestions();
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // let calculate=()=>{
  //   setShowitem(saltSuggestion.most_common.Form)
  //   console.log(showitem);
  // }
  return (
    <div>
      <h2>Salt Suggestions</h2>
      <input
        type="text"
        id="search"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter your search query"
      />
      <ul className="container">
        {saltSuggestions.map((saltSuggestion) => (
          <li className="card" key={saltSuggestion.id}>
            {/* <p>Salt: {saltSuggestion.salt}</p>
            <p>Available Forms: {saltSuggestion.available_forms.join(', ')}</p>
            <p>Most Common:</p> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <div>
                <ul>
                  <li className="a">
                  
                    <span>Form:</span>
                    <span className="button-35" onClick={() => { setShowitem(saltSuggestion.most_common.Form) }} >
                       {saltSuggestion.most_common.Form}
                      {/* {console.log(showitem)} */}
                    </span>
                  </li>
                  <div>{console.log(setShowitem)}</div>
                  <li className="a">
                    <span>Strength:</span>{" "}
                    <span className="button-35" onClick={() => { setStrength(saltSuggestion.most_common.Strength) }}>
                      {saltSuggestion.most_common.Strength}
                    </span>
                  </li>
                  <li className="a">
                    <span>Packing:</span>{" "}
                    <span className="button-35" onClick={() => { setPacking(saltSuggestion.most_common.Packing)}}>
                      {saltSuggestion.most_common.Packing}
                    </span>
                  </li>
                </ul>
              </div>

              
            </div>
            <div>
              <div className="items" ><ol style={{ listStyleType: 'upper-latin' }}><li >salt</li></ol></div>
              <div className="items">
                <span> {showitem} |</span>
                <span>{strength} |</span>
                <span>{packing } </span>
              </div>
            </div>
            <div className="price"><h4>price  30</h4></div>
            {/* You can add more details htere */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaltSuggestions;
