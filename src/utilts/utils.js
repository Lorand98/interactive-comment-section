export function calculateElapsedTimeInSeconds(timeStampOlder, timeStampNewer) {
  const timeDiff = (timeStampNewer - timeStampOlder) / 1000;

  return timeDiff;
}

export function calculateApproximateElapsedTimeString(elapsedSeconds) {
  let elapsedTime = elapsedSeconds;

  //SECONDS

  if (elapsedTime < 60) {
    return 'just now';
  }

  //MINUTES

  elapsedTime = Math.floor(elapsedTime / 60);

  if (elapsedTime < 60) {
    if (elapsedTime === 1) {
      return '1 minute ago';
    }
    return `${elapsedTime} minutes ago`;
  }

  //HOURS

  elapsedTime = Math.floor(elapsedTime / 60);

  if (elapsedTime < 24) {
    if (elapsedTime === 1) {
      return '1 hour ago';
    }
    return `${elapsedTime} hours ago`;
  }

  //DAYS

  elapsedTime = Math.floor(elapsedTime / 24);

  if (elapsedTime < 7) {
    if (elapsedTime === 1) {
      return '1 day ago';
    }
    return `${elapsedTime} hours ago`;
  }

  //WEEKS

  elapsedTime /= 7;

  if (elapsedTime < 4.3) {
    if (elapsedTime < 2) {
      return '1 week ago';
    }

    return `${Math.floor(elapsedTime)} weeks ago`;
  }

  //MONTHS

  elapsedTime = Math.floor(elapsedTime / 4.3);

  if (elapsedTime < 12) {
    if (elapsedTime === 1) {
      return `1 month ago`;
    }

    return `${elapsedTime} months ago`;
  }

  //YEARS

  if (elapsedTime === 1) {
    return `1 year ago`;
  }

  return `${elapsedTime} years ago`;
}
