export function getFormattedDate(date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  //if the current year is not this year, display year
  if (new Date().getFullYear() != date.getFullYear()) {
    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`
  }
  // if current year is equal to this year, do not display the year
  else return `${monthNames[date.getMonth()]} ${date.getDate()}`
}

export function getShortenedFormattedDate(date) {
  const shortenedMonthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  //if the current year is not this year, display year
  if (new Date().getFullYear() != date.getFullYear()) {
    return `${
      shortenedMonthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`
  }
  // if current year is equal to this year, do not display the year
  else return `${shortenedMonthNames[date.getMonth()]} ${date.getDate()}`
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}
