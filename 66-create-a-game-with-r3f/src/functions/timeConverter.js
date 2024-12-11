export const timeConverter = {
  millisecondsToSeconds: (ms) => {
    // ms to hh:mm:ss
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      String(hours).padStart(2, '0'),
      String(minutes).padStart(2, '0'),
      String(seconds).padStart(2, '0'),
    ].join(':');
  },
  isoToStandard: (iso) => {
    // iso -> mm/dd/yy
    const date = new Date(iso);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(date.getUTCFullYear()).slice(-2); // Get last two digits of the year

    return `${month}/${day}/${year}`;
  },
};
