export const getFormattedDateString = (date) => {
  // setSelectedDate(date);
  console.log("setSelectedDate1" + date)

  console.log("Now its Combined of Date and Time...." + date);
  var year = date.getFullYear();
  console.log("Now its year....", year);

  var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  var day = String(date.getDate()).padStart(2, '0');
  var dateChosen = `${year}-${month}-${day}`;
  console.log("Now datechosen is " + dateChosen)
  return dateChosen

};
