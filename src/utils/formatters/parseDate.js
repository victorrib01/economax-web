export function parseDate(dateString) {
  const [date, time] = dateString.split(" ");
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes, seconds] = time.split(":").map(Number);

  const dateFormatted = new Date(year, month - 1, day, hours, minutes, seconds);
  return dateFormatted;
}
