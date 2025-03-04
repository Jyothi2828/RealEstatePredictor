// formValidation.js

import { PROPERTY_FORM_CONSTANTS } from '../constants/forms/propertyFormConstants';
import { VALIDATION_MESSAGES } from '../constants/validation/propertyValidationConstants';

export const validatePropertyInput = (propertyInput) => {
    try {
        const errors = {};
        const { AREA, ROOMS, AGE } = PROPERTY_FORM_CONSTANTS;

        // Area validation
        if (!propertyInput.Area || propertyInput.Area < AREA.MIN) {
            errors.Area = VALIDATION_MESSAGES.AREA.TOO_SMALL;
        } else if (propertyInput.Area > AREA.MAX) {
            errors.Area = VALIDATION_MESSAGES.AREA.TOO_LARGE;
        }

        // Bedroom validation with area constraint
        if (propertyInput.Area && propertyInput.Bedrooms) {
            const maxBedrooms = Math.floor(propertyInput.Area / AREA.MIN_PER_BEDROOM);
            if (propertyInput.Bedrooms > maxBedrooms) {
                errors.Bedrooms = VALIDATION_MESSAGES.BEDROOMS.AREA_CONSTRAINT(maxBedrooms);
            }
        }

        // Bathroom validation with area constraint
        if (propertyInput.Area && propertyInput.Bathrooms) {
            const maxBathrooms = Math.floor(propertyInput.Area / AREA.MIN_PER_BATHROOM);
            if (propertyInput.Bathrooms > maxBathrooms) {
                errors.Bathrooms = VALIDATION_MESSAGES.BATHROOMS.AREA_CONSTRAINT(maxBathrooms);
            }
        }

        // Room count validation
        if (propertyInput.Bedrooms === 0) {
            errors.Bedrooms = VALIDATION_MESSAGES.BEDROOMS.ZERO;
        } else if (propertyInput.Bedrooms < 0) {
            errors.Bedrooms = VALIDATION_MESSAGES.BEDROOMS.NEGATIVE;
        } else if (propertyInput.Bedrooms > ROOMS.MAX_BEDROOMS) {
            errors.Bedrooms = VALIDATION_MESSAGES.BEDROOMS.TOO_MANY;
        }

        if (propertyInput.Bathrooms === 0) {
            errors.Bathrooms = VALIDATION_MESSAGES.BATHROOMS.ZERO;
        } else if (propertyInput.Bathrooms < 0) {
            errors.Bathrooms = VALIDATION_MESSAGES.BATHROOMS.NEGATIVE;
        } else if (propertyInput.Bathrooms > ROOMS.MAX_BATHROOMS) {
            errors.Bathrooms = VALIDATION_MESSAGES.BATHROOMS.TOO_MANY;
        }

        // Age validation
        if (propertyInput["Age of Property"] < AGE.MIN) {
            errors["Age of Property"] = VALIDATION_MESSAGES.AGE.NEGATIVE;
        } else if (propertyInput["Age of Property"] > AGE.MAX) {
            errors["Age of Property"] = VALIDATION_MESSAGES.AGE.TOO_OLD;
        }

        // Location validation
        if (!propertyInput.Location) {
            errors.Location = VALIDATION_MESSAGES.LOCATION.REQUIRED;
        } else if (!PROPERTY_FORM_CONSTANTS.LOCATIONS.includes(propertyInput.Location)) {
            errors.Location = VALIDATION_MESSAGES.LOCATION.INVALID;
        }

        return errors;
    } catch (error) {
        console.error('Validation error:', error);
        return { general: 'Invalid property configuration' };
    }
};