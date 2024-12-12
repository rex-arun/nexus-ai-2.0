// stringUtils.js
// import levenshtein from 'fast-levenshtein';

// export const getNormalizedString = (str) => {
//     return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase().trim();
// };

// export const getSimilarity = (str1, str2) => {
//     const distance = levenshtein.get(str1, str2);
//     const maxLength = Math.max(str1.length, str2.length);
//     return 1 - distance / maxLength; // Return a similarity score between 0 and 1
// };





// ==== manual ==== 
// stringUtils.js

// stringUtils.js

export const getNormalizedString = (str) => {
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase().trim();
};

export const tokenize = (str) => {
    return new Set(getNormalizedString(str).split(/\s+/)); // Split by whitespace and convert to a Set
};

export const jaccardSimilarity = (str1, str2) => {
    const set1 = tokenize(str1);
    const set2 = tokenize(str2);
    
    const intersection = new Set([...set1].filter(x => set2.has(x))).size;
    const union = new Set([...set1, ...set2]).size;

    return intersection / union; // Jaccard similarity score between 0 and 1
};

export const getSimilarity = (str1, str2) => {
    return jaccardSimilarity(str1, str2); // Use Jaccard similarity instead of Levenshtein
};