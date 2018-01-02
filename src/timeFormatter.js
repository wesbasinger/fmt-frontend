export default  (decimalHours) => {

  const delim = decimalHours.split(".")

  const hours = Number(delim[0]);

  const minutes = Math.round(Number("0." + delim[1])*60)

  let result = ""

  if(decimalHours==="N/A") {
    return "Sign in, no time logged.";
  }

  if(hours > 0) {
    result += hours + " hours"
  }
  if (minutes > 0) {
    result += " " + minutes + " minutes"
  }

  if (result==="") {
    return "No time logged."
  }

  return result;
}
