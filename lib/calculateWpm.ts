export function calculateWPM(len: number, time: string) {
  // Convert the time string to minutes
  const timeParts = time.split(":");
  const minutes = parseInt(timeParts[0]);
  const seconds = parseInt(timeParts[1]);
  const totalTime = minutes + seconds / 60;

  // Calculate the WPM
  const wpm = len / 5 / totalTime; // Assuming an average word length of 5 characters
  return Math.round(wpm);
}

// // Example usage
// const characters = 200;
// const time = "10:87";
// const wpm = calculateWPM(characters, time);
// alert("Words Per Minute: " + wpm);
