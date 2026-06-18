function padNumber(value) {
  return String(value).padStart(2, "0");
}

export function addDays(date, offset) {
  const next = new Date(date);
  next.setDate(next.getDate() + offset);
  return next;
}

export function toDateKey(date) {
  return [
    date.getFullYear(),
    padNumber(date.getMonth() + 1),
    padNumber(date.getDate()),
  ].join("-");
}

export function formatDisplayDate(dateValue) {
  if (!dateValue) {
    return "Date TBC";
  }

  const parsed = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return parsed.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDisplayTime(startTime, endTime) {
  if (!startTime && !endTime) {
    return "Time TBC";
  }

  if (!endTime) {
    return startTime;
  }

  return `${startTime} - ${endTime}`;
}

export function isToday(dateValue) {
  if (!dateValue) {
    return false;
  }

  return dateValue === toDateKey(new Date());
}
