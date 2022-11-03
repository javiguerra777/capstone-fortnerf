const convertToDate = (number: number, first: boolean) => {
  const date: Date = new Date(number);
  const dateToString: string = date.toLocaleString('en-us');
  const dateSplit = dateToString.split(',');
  // returns the date ex: 09/07/2022
  if (first) {
    return dateSplit[0];
  }
  // gets the time ex: 10:59
  const time = dateSplit[1].slice(0, -6);
  // gets the am or pm of the time
  const amOrPm = dateSplit[1].slice(-2);
  // returns the exact time ex: 1:01 pm
  return `${time} ${amOrPm}`;
};

export default convertToDate;
