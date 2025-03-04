import React, { useState } from 'react';
import '../styles/formStyles.css';
import { validatePropertyInput } from '../utils/formValidation';  // Import the validation function

const PropertyInputForm = ({ propertyInput, handleInputChange, handlePredictPrice, predictedPrice, actualPrice }) => {
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validatePropertyInput(propertyInput);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            handlePredictPrice();
        }
    };

    const handleChange = (e) => {
        handleInputChange(e);
        // Clear error for the field being changed if it exists
        if (errors[e.target.name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[e.target.name];
                return newErrors;
            });
        }
    };

    const formatPrice = (price) => {
        return (price * 1000).toLocaleString();
    };

    return (
        <div className="form-container" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <form className="form" onSubmit={handleSubmit}>
                {Object.keys(errors).length === 0 && actualPrice && (
                    <div className="actual-price">
                        <h3>Actual Price: ${actualPrice}</h3>
                    </div>
                )}

                <div className="input-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="area">Area (sq ft)</label>
                    <input
                        type="number"
                        id="area"
                        name="Area"
                        value={propertyInput.Area}
                        onChange={handleChange}
                        placeholder="Enter area in square feet"
                        required
                    />
                    {errors.Area && <div className="error">{errors.Area}</div>}
                </div>
                <div className="input-group">
                    <label htmlFor="bedrooms">Number of Bedrooms</label>
                    <input
                        type="number"
                        id="bedrooms"
                        name="Bedrooms"
                        value={propertyInput.Bedrooms}
                        onChange={handleChange}
                        placeholder="Enter number of bedrooms"
                        required
                    />
                    {errors.Bedrooms && <div className="error">{errors.Bedrooms}</div>}
                </div>
                <div className="input-group">
                    <label htmlFor="bathrooms">Number of Bathrooms</label>
                    <input
                        type="number"
                        id="bathrooms"
                        name="Bathrooms"
                        value={propertyInput.Bathrooms}
                        onChange={handleChange}
                        placeholder="Enter number of bathrooms"
                        required
                    />
                    {errors.Bathrooms && <div className="error">{errors.Bathrooms}</div>}
                </div>
                <div className="input-group">
                    <label className="form-label">Location:</label>
                    <div className="radio-group">
                        {['Downtown', 'Suburban', 'Rural'].map((location) => (
                            <div key={location} className="radio-option">
                                <input 
                                    type="radio" 
                                    id={location} 
                                    name="Location" 
                                    value={location} 
                                    checked={propertyInput.Location === location}
                                    onChange={handleChange}
                                    className="radio-input"
                                />
                                <label htmlFor={location} className="radio-label">{location}</label>
                            </div>
                        ))}
                    </div>
                    {errors.Location && (
                        <div className="error-message">{errors.Location}</div>
                    )}
                </div>
                <div className="input-group">
                    <label>Age of Property :</label>
                    <input 
                        type="number" 
                        name="Age of Property" 
                        value={propertyInput["Age of Property"] || ''} 
                        onChange={handleChange} 
                        required 
                    />
                    {errors['Age of Property'] && <div className="error">{errors['Age of Property']}</div>}
                </div>
                <button className="btn-12" type="submit" style={{ backgroundColor: '#6482AD', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    <span>Predict Price</span>
                </button>
            </form>

            {predictedPrice !== null && predictedPrice !== undefined && ( 
                <div className="form-container-predicted-price">
                    <h3 className="title" style={{ color: '#333', fontSize: '1.5em' }}>
                        Predicted Price: ${formatPrice(predictedPrice)}
                    </h3>
                </div>
            )}
        </div>
    );
};

export default PropertyInputForm;
