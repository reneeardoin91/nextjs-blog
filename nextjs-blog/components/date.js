import { parseISO, format } from 'date-fns'; // Import the date parsing and formatting helper functions.

export default function Date({ dateString }) { // Define a reusable component that receives a date string as a prop.
  const date = parseISO(dateString); // Turn the ISO date string into a real JavaScript Date object.
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>; // Render the date in a friendly, readable format.
}
