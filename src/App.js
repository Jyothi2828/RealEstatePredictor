import React from 'react';
import Header from './components/Header';
import PropertyInputForm from './components/PropertyInputForm';
import PredictedPrice from './components/PriceComparisonChart';
import FeedbackForm from './components/FeedbackForm';
import useRealEstatePrediction from './hooks/useRealEstatePrediction';
import './styles/App.css';
import './styles/chartStyles.css';
import './styles/layoutStyles.css';

const App = () => {
    const {
        predictedPrice,
        actualPrice,
        propertyInput,
        handleInputChange,
        handlePredictPrice,
    } = useRealEstatePrediction();

    return (
        <>
            <Header />
            <main className="main-content">
                <div className="content-container">
                    <div className="left-section">
                        <PropertyInputForm
                            predictedPrice={predictedPrice}
                            propertyInput={propertyInput}
                            handleInputChange={handleInputChange}
                            handlePredictPrice={handlePredictPrice}
                        />
                    </div>
                    <div className="right-section">
                        <PredictedPrice
                            predictedPrice={predictedPrice}
                            actualPrice={actualPrice}
                        />
                        <FeedbackForm 
                            predictedPrice={predictedPrice} 
                            actualPrice={actualPrice} 
                            propertyInput={propertyInput} 
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default App;
