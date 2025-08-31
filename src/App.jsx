import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    GENDER: "M",
    AGE: 65,
    SMOKING: 1,
    YELLOW_FINGERS: 1,
    ANXIETY: 0,
    PEER_PRESSURE: 0,
    "CHRONIC DISEASE": 1,
    FATIGUE: 1,
    ALLERGY: 0,
    WHEEZING: 1,
    "ALCOHOL CONSUMING": 0,
    COUGHING: 1,
    "SHORTNESS OF BREATH": 1,
    "SWALLOWING DIFFICULTY": 0,
    "CHEST PAIN": 1,
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/predict", {
        features: formData,
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
      alert("Prediction failed! Check backend logs.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lung Cancer Predictor</h1>
      <form onSubmit={handleSubmit}>
        {/* AGE */}
        <div>
          <label>Age: </label>
          <input
            type="number"
            name="AGE"
            value={formData.AGE}
            onChange={handleChange}
          />
        </div>

        {/* GENDER */}
        <div>
          <label>Gender: </label>
          <select name="GENDER" value={formData.GENDER} onChange={handleChange}>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        {/* Other binary features */}
        {Object.keys(formData).map((key) =>
          key !== "AGE" && key !== "GENDER" ? (
            <div key={key}>
              <label>{key}: </label>
              <select name={key} value={formData[key]} onChange={handleChange}>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
          ) : null
        )}

        <button type="submit" style={{ marginTop: "15px" }}>
          Predict
        </button>
      </form>

      {prediction !== null && (
        <h2 style={{ marginTop: "20px" }}>
          Prediction:{" "}
          {prediction === 1
            ? "High risk of lung cancer"
            : "Low risk of lung cancer"}
        </h2>
      )}
    </div>
  );
}

export default App;
