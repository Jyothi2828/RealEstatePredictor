export const VALIDATION_MESSAGES = {
    AREA: {
        TOO_SMALL: "Area seems too small. Minimum area should be 200 sq ft",
        TOO_LARGE: "Area seems too large. Please enter a realistic area"
    },
    BEDROOMS: {
        ZERO: "No bedrooms? Please enter at least one bedroom. Are you looking for a studio apartment?",
        NEGATIVE: "Negative bedrooms don't exist! Please enter a positive number of bedrooms.",
        TOO_MANY: "Wow, that's a lot of bedrooms! Please enter 8 or fewer bedrooms.",
        AREA_CONSTRAINT: (maxBedrooms) => `This area can only accommodate ${maxBedrooms} bedrooms`
    },
    BATHROOMS: {
        ZERO: "A house without bathrooms? Please enter at least one bathroom. Every home needs a bathroom!",
        NEGATIVE: "Negative bathrooms aren't a thing! Please enter a positive number of bathrooms.",
        TOO_MANY: "That's a lot of bathrooms! Please enter 10 or fewer bathrooms.",
        AREA_CONSTRAINT: (maxBathrooms) => `This area can only accommodate ${maxBathrooms} bathrooms`
    },
    AGE: {
        NEGATIVE: "A house from the future? Please enter a positive number for the property's age.",
        TOO_OLD: "Wow, that's ancient! Are you searching for a historic home? Please enter a lower age for more typical properties."
    },
    LOCATION: {
        REQUIRED: "Please select a location (Downtown, Suburban, or Rural)",
        INVALID: "Please select a valid location"
    }
};