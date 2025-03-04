import { useState, useEffect } from 'react';
import { addProperty } from '../utils/indexedDB';
import { trainNetwork, predictPrice } from '../ml-model/neuralNetwork';
import realEstateData from '../data/realestate.json';

const useRealEstatePrediction = () => {
    const findActualPrice = (input) => {
        console.log('Input values for actual price search:', input); // Debugging log
        const property = realEstateData.find(property => 
            property.Area === String(input.Area) &&
            property.Bedrooms === String(input.Bedrooms) &&
            property.Bathrooms === String(input.Bathrooms) &&
            property.Location === String(input.Location) &&
            property["Age of Property"] === String(input["Age of Property"])
        );

        console.log('Comparing with property:', property); // Debugging log

        return property ? property.Price : null; 
    };

    const [predictedPrice, setPredictedPrice] = useState(null);
    const [actualPrice, setActualPrice] = useState(null);  // ✅ Add actualPrice state
    const [propertyInput, setPropertyInput] = useState({
        Area: '',
        Bedrooms: '',
        Bathrooms: '',
        Location: '', // Initialize with empty string
        'Age of Property': ''
    });

    useEffect(() => {
        trainNetwork((stats) => {
            console.log(`Training: ${stats.iterations} iterations`);
        });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPropertyInput(prevInput => ({ ...prevInput, [name]: value }));
    };

    const handlePredictPrice = async () => {
        console.log('Input values for actual price search:', propertyInput);
        const actualPriceValue = findActualPrice(propertyInput);
        const predictedPriceValue = predictPrice(propertyInput);

        setActualPrice(actualPriceValue);  // ✅ Store actual price in state
        setPredictedPrice(predictedPriceValue); // Ensure predicted price is set correctly

        // Store property input in IndexedDB
        const propertyData = { id: Date.now(), ...propertyInput };
        await addProperty(propertyData);
    };

    return {
        predictedPrice,
        actualPrice,  // ✅ Return actualPrice
        propertyInput,
        handleInputChange,
        handlePredictPrice,
    };
};

export default useRealEstatePrediction;
