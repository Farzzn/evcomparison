import React, { useState, useEffect } from 'react';
import './detials.css';

const VehicleForm = () => {
  const [selectedValues, setSelectedValues] = useState({
    typesDropdown: '',
    makesDropdown: '',
    modelDropdown: ''
  });

  const [vehicleData, setVehicleData] = useState(null);
  const [modelData, setModelData] = useState(null);

  useEffect(() => {
    fetch('https://script.googleusercontent.com/macros/echo?user_content_key=EWdng17AQWmoxGDFy0qj6pppVgHQQnCJaoe57yCNLuXFPv6XIJlANjJxAIJEdToAF5CHTYKqGAyKB82eRX9CnK2wv8YbNFlwm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnD7LTDAgcsXj4QWRvWoLP8VrNqmYm0dTDsjivlZr5t-LRyJ_QT7YNmV_R_WFSfPfM4pHwhaJgUo7HfFcMr0Gi2HyAE-HlZfi1A&lib=MS1bqgT8n3LUBMH833Wm9V7qr18IHoUaO')
      .then(response => response.json())
      .then(data => {
        setVehicleData(data.data);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch('https://script.googleusercontent.com/macros/echo?user_content_key=1MT4Fl8IHe-K19BYhREOwwnUGPuZFtfPLtxE2NWSkYfDtSNVLD3PJjeVRLWA1jKmjR5zDk5yF4dprOHoVkUSEE6Nk1sVVQpnm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMui92DJbVC1KUgDXgQmRcLmDCGh8mZ_L_V8lDGsN71zKZDZpIkhA3H_j2HNO9fS4b3O9zFdrYlF0IcAQOdvdJSEgu4uvD2lmQ&lib=MS1bqgT8n3LUBMH833Wm9V7qr18IHoUaO')
      .then(response => response.json())
      .then(data => {
        setModelData(data.data);
      })
      .catch(error => console.log(error));
  }, []);

  const [modelDetials, setModelDetials] = useState(null);
  useEffect(() => {
    if (selectedValues.modelDropdown) {
      fetch('https://script.googleusercontent.com/a/macros/nitp.ac.in/echo?user_content_key=LTFgZ69JyPOQe1RJWP2J0LaY3y-9rG5gBLqUf8xyiDjbWgbexyJZyHw7ynGGGzJqnFtV2MvQ-KyPE7y8IXpBtpxdhnkiyaRUm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_nRPgeZU6HP9Gk3LAbHB0UyHaYKxUla6AWfbFZwADmYQjwh5IvUdBRNUiXVgZMMcrCbrgryMDhOEpr3lAaS7OHfWjqTT_0MTL68J59YEUUI-7ApwXyHo7hnEuoAshFFrEXMuqa_jo9BU&lib=MS1bqgT8n3LUBMH833Wm9V7qr18IHoUaO')
        .then(response => response.json())
        .then(data => {
          const selectedModelData = data.data.find(
            model => model.Model === selectedValues.modelDropdown
          );
          setModelDetials(selectedModelData);
        })
        .catch(error => console.log(error));
    }
  }, [selectedValues.modelDropdown]);

  const handleTypeChange = event => {
    const selectedType = event.target.value;
    setSelectedValues(prevValues => ({
      ...prevValues,
      typesDropdown: selectedType,
      makesDropdown: '',
      modelDropdown: ''
    }));
  };

  const handleMakeChange = event => {
    const selectedMake = event.target.value;
    setSelectedValues(prevValues => ({
      ...prevValues,
      makesDropdown: selectedMake,
      modelDropdown: ''
    }));
  };

  const handleModelChange = event => {
    const selectedModel = event.target.value;
    setSelectedValues(prevValues => ({
      ...prevValues,
      modelDropdown: selectedModel
    }));
  };

  return (
    <div className='container'>
      <select
        value={selectedValues.typesDropdown}
        onChange={handleTypeChange}
      >
        <option value="">Type</option>
        <option value="Two-Wheeler">Two-Wheeler</option>
        <option value="Three-Wheeler">Three-Wheeler</option>
        <option value="Four-Wheeler">Four-Wheeler</option>
      </select>

      <select
        value={selectedValues.makesDropdown}
        onChange={handleMakeChange}
      >
        <option value="">Make</option>
        {selectedValues.typesDropdown &&
          vehicleData &&
          vehicleData[selectedValues.typesDropdown] &&
          vehicleData[selectedValues.typesDropdown].map((make, index) => (
            <option key={index} value={make}>
              {make}
            </option>
          ))}
      </select>

      <select value={selectedValues.modelDropdown} onChange={handleModelChange}>
        <option value="">Model</option>
        {selectedValues.makesDropdown &&
          modelData &&
          modelData[selectedValues.makesDropdown] &&
          modelData[selectedValues.makesDropdown].map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
      </select>

      {modelDetials && (
<div className="model-details">
  <img src={`./images/${modelDetials.Model}.png`} alt={modelDetials.Model} />
  <h3>Model Details:</h3>
  <p><strong>Model:</strong> {modelDetials.Model}</p>
  <p><strong>Ex Showroom Price:</strong> {modelDetials['Ex Showroom Price']} Rs</p>
  <p><strong>Battery Size:</strong> {modelDetials['Battery Size']}</p>
  <p><strong>Battery Type:</strong> {modelDetials['Battery Type']}</p>
  <p><strong>Charger Rating:</strong> {modelDetials['Charger Rating']}</p>
  <p><strong>Driving Range:</strong> {modelDetials['Driving Range']} KM</p>
  <p><strong>Charging Time:</strong> {modelDetials['Charging Time']} Hrs</p>
</div>

      )}
    </div>
  );
};

export default VehicleForm;
