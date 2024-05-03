/**
 * 
 * @param {object} providedDate 
 * It takes provided date from endpoints data
 * @returns formatted date
 */
const dateFormat = (providedDate) => {
    const month = providedDate.month;
    const day = providedDate.dayOfMonth;
    const year = providedDate.year;
    const date = `${month}/${day}/${year}`
    
    const dateString = date; 
    const string = new Date(dateString);          

    const dateFormatted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
    }).format(string);

    return dateFormatted;
}

export default dateFormat;