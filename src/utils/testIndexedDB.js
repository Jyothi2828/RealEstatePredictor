const { getProperties } = require('./indexedDB');

const testIndexedDB = async () => {
    try {
        const properties = await getProperties();
        console.log('Stored properties:', properties);
    } catch (error) {
        console.error('Error retrieving properties:', error);
    }
};

testIndexedDB();
