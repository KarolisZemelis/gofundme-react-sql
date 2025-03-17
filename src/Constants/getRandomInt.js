export default function getRandomInt(min, max) {
    // Ensure min and max are integers.
    min = Math.ceil(min);
    max = Math.floor(max);

    // Generate a random number within the range.
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
