export default function calculateScore(startTime, endTime, level) {
  const elapsedTime = (endTime - startTime) / 1000;
  const score = Math.round(
    (1 / elapsedTime) * (Math.log10(level) * 10000 + 1000)
  );
  return score;
}
