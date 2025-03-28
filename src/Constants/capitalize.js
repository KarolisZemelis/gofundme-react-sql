export default function capitalizeFirstLetters(str) {
    if (!str) return ''; // Handle null or undefined strings

    return str
        .split(' ') // Split the string into an array of words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a string
}