import React, { useState } from "react";
import "../styles/feedbackStyles.css";
import { addProperty } from '../utils/indexedDB';

const FeedbackForm = ({ predictedPrice, actualPrice, propertyInput }) => {
  const [feedback, setFeedback] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [predictionErrorMessage, setPredictionErrorMessage] = useState(false);
  const [sentimentMessage, setSentimentMessage] = useState("");
  const [showAppreciationMessage, setShowAppreciationMessage] = useState(false);

  const handleEmojiClick = (selectedSentiment) => {
    setSentiment(selectedSentiment);
    setErrorMessage(false);
    setPredictionErrorMessage(false);
    setSentimentMessage(""); 


  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!predictedPrice) {
      setPredictionErrorMessage(true);
      return;
    }

    if (!sentiment || !feedback.trim()) {
      setErrorMessage(true);
      return;
    }

    if (
      !propertyInput ||
      !propertyInput.Area ||
      !propertyInput.Bedrooms ||
      !propertyInput.Bathrooms ||
      !propertyInput.Location
    ) {
      setErrorMessage(true);
      return;
    }

    const feedbackData = {
      sentiment,
      feedback,
      predictedPrice,
      actualPrice,
      propertyDetails: {
        Area: propertyInput.Area,
        Bedrooms: propertyInput.Bedrooms,
        Bathrooms: propertyInput.Bathrooms,
        Location: propertyInput.Location,
        AgeOfProperty: propertyInput["Age of Property"],
      },
      timestamp: new Date().toISOString(),
    };

    // Store feedback in IndexedDB
    await storeFeedbackInIndexedDB(feedbackData);

    // Add the property using addProperty
    try {
        await addProperty({
            ...propertyInput,
            predictedPrice,
            actualPrice
        });
        // Handle success
    } catch (error) {
        console.error('Error saving property:', error);
    }

    // Set success message
    setSuccessMessage(true);
    setShowAppreciationMessage(true);

    // Clear success message after a delay
    setTimeout(() => {
      setSuccessMessage(false);
      setShowAppreciationMessage(false);
      // Reset form
      setFeedback("");
      setSentiment(null);
      setSentimentMessage("");
    }, 4000);
  };

  // IndexedDB Helper functions
  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("FeedbackDB", 1);

      request.onerror = () => reject(new Error("Failed to open database"));

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore("Feedback", {
          keyPath: "timestamp",
        });
        objectStore.createIndex("sentiment", "sentiment", { unique: false });
      };

      request.onsuccess = () => resolve(request.result);
    });
  };

  const storeFeedbackInIndexedDB = async (feedbackData) => {
    try {
      const db = await openDatabase();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(["Feedback"], "readwrite");
        const objectStore = transaction.objectStore("Feedback");
        const request = objectStore.add(feedbackData);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error("Failed to store feedback"));

        transaction.oncomplete = () => db.close();
      });
    } catch (error) {
      console.error("Error storing feedback in IndexedDB:", error);
    }
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">How was your prediction experience?</h2>
      {predictionErrorMessage && (
        <div className="error-message">
          You haven't made a prediction yet. Please use the prediction tool
          and provide feedback.
        </div>
      )}
      {showAppreciationMessage && (
        <div className="success-overlay">
          <div className="success-message">We appreciate your feedback. We'll work on improving our predictions to better meet your expectations.</div>
        </div>
      )}
      <form onSubmit={handleSubmit} className={`feedback-form ${successMessage ? "blurred" : ""}`}>
        <div className="emoji-container">
          {["😊", "😐", "😔"].map((emoji, index) => {
            const sentiments = ["happy", "neutral", "unhappy"];
            return (
              <button
                key={index}
                type="button"
                className={`emoji-btn ${
                  sentiment === sentiments[index] ? "active" : ""
                }`}
                onClick={() => handleEmojiClick(sentiments[index])}
                disabled={successMessage}
              >
                <span className="emoji">{emoji}</span>
                <p>
                  {sentiments[index] === "happy"
                    ? "Satisfied"
                    : sentiments[index] === "neutral"
                    ? "Neutral"
                    : "Unsatisfied"}
                </p>
              </button>
            );
          })}
        </div>
        {sentimentMessage && (
          <div className="sentiment-message">{sentimentMessage}</div>
        )}
        <div className="input-group">
          <label htmlFor="feedback">Detailed Feedback</label>
          <textarea
            id="feedback"
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts about the price prediction..."
            disabled={successMessage}
          />
        </div>
        {errorMessage && (
          <div className="error-message">
            Please select an emoji and provide feedback.
          </div>
        )}
        <button type="submit" className="submit-btn" disabled={successMessage}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
