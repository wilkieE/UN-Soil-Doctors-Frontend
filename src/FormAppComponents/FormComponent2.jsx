/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect, useContext } from 'react';
import TextInput from './TextInput';
// import Dropdown from './DropDown';
import { LanguageContext } from './LanguageContext';
import RadioButtonGroup from './RadioButtonGroup';
import { labels } from './Labels';
import { useNavigate } from 'react-router-dom';
import {defaultFormValues} from './defaultFormValues';

const stageContainerStyles = css`
display: flex;
align-items: center;
margin-bottom: 20px; // Add some margin at the bottom for spacing
`;
const stageStyles = css`
  padding: 6px 5px;
  margin-left: 10px;
  background-color: #f4f4f9; // A light grey for a subtle background
  border-radius: 5px;
  margin-bottom: 0px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  font-size: 0.85em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: #0077cc; // Making the stage text the same color as your submit button for consistency
  }
`;
const formStyles = css`
max-width: 500px;
  margin: 40px auto;
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 2em;
  font-family: 'Lato', sans-serif;
  background-color: #ffffff;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const submitButtonStyles = css`
  padding: 12px 25px;
  background-color: #0077cc;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #005fa3;
    transform: translateY(-2px);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &[disabled] {
    background-color: #aaa; 
    cursor: not-allowed;   

    &:hover {
      background-color: #aaa;  
      transform: none;         
      box-shadow: none;        
    }
  }
`;

const iconStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px'
};

const circleStyles = {
  border: '2px solid #333',
  borderRadius: '50%',
  width: '10px',
  height: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '12px',
  fontWeight: 'bold'
};


const NotRegisteredIcon = () => (
  <div style={iconStyles}>
    <div style={{ ...circleStyles, borderColor: '#FF4D4F' }}>
      X
    </div>
    <span style={{ color: '#FF4D4F' }}>Not Registered Yet</span>
  </div>
);

const RegisteredIcon = () => (
  <div style={iconStyles}>
    <div style={{ ...circleStyles, borderColor: '#4CAF50' }}>
      ✓
    </div>
    <span style={{ color: '#4CAF50' }}>Registered</span>
  </div>
);
const FormComponent = () => {
  const [isFormLocked, setIsFormLocked] = useState(false);

  const { language } = useContext(LanguageContext);

  const [formValues, setFormValues] = useState({
    defaultFormValues
  });

  const [isLoading, setIsLoading] = useState(true);
  
  
  useEffect(() => {
    console.log("useEffect triggered");
    
    const email = window.location.pathname.substring(1);
    console.log("Parsed email from URL:", email);
    
    if (email) {
      setIsLoading(true);
      console.log("Making fetch request for:", email);
  
      fetch(`http://localhost:5000/get-application?email=${email}`)
      .then(response => {
          console.log("Server responded with status:", response.status);
          
          if (response.ok) {
            return response.json();
          }
  
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          console.log("Received data from server:", data);
  
          setFormValues(prevState => ({
            ...prevState,
            ...data
          }));
          setIsLoading(false);
          console.log("Form values updated and loading stopped");
          if (data.stage === 'Awaiting Confirmation') {
            setIsFormLocked(true);
          }
          
          setIsLoading(false);
          console.log("Form values updated and loading stopped");
          
        })
        .catch(error => {
          console.log('There was a problem with the fetch operation:', error.message);
          setIsLoading(false);
        });
    } else {
      console.log("Email not found in the URL. Skipping fetch operation.");
      setIsLoading(false);
    }
  }, []);
  
  let navigate = useNavigate();


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (!formValues.email) {
      setErrors({ email: language === 'en' ? 'Email is required.' : 'Требуется электронная почта.' });
      return;
    }
  
    setErrors({});
  
    const updatedFormData = {
      ...formValues,
      stage: 'Awaiting Confirmation' // Adding the desired stage to the form data
    };
  
    // Send a post request to the backend to update the data and status
    fetch('http://localhost:5000/update-application-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        window.location.reload();
        
        navigate(`/email`);
      } else {
        console.error(data.message);
      }
    })
    .catch(error => {
      console.error('Error updating the application status:', error);
    });
  };

  
  function getTranslation(key, lang) {
    return labels[lang][key];
  }
  // function getTranslation2(key, lang) {
  //   return labels[key][lang];
  // }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(formValues.stage)
  
  console.log(formValues.registeredInMap)
  return (
    <form css={formStyles} onSubmit={handleSubmit}>
      <div css={stageContainerStyles}>
        <span>{getTranslation('currentStage', language)}:</span> 
        {formValues.stage && 
          <div css={stageStyles}>
            <span>{formValues.stage}</span>
          </div>
        }
      </div>
      <TextInput 
        label={getTranslation('email', language)} 
        name="email" 
        value={formValues.email} 
        onChange={handleInputChange}
        error={errors.email} 
        locked={isFormLocked || true} // Email is always locked based on your code
      />
      <RadioButtonGroup
        label={getTranslation('actorType', language)}
        name="actorType"
        value={formValues.actorType}
        onChange={handleInputChange}
        translationKey="actorType"
        error={errors.actorType}
        locked={isFormLocked}
      />
  
      <div style={{ alignItems: 'left', fontSize:'12px'}}>
        <TextInput 
          label={getTranslation('institutionNameForMap', language)} 
          name="mapInstitutionName" 
          value={formValues.mapInstitutionName} 
          onChange={handleInputChange}
          error={errors.mapInstitutionName}
          locked={isFormLocked}
        />
        {formValues.registeredInMap ? <RegisteredIcon /> : <NotRegisteredIcon />}
      </div>


<input css={submitButtonStyles} type="submit" value={getTranslation('submit',language)} disabled={isFormLocked} />
    </form>
  );

};

export default FormComponent;
