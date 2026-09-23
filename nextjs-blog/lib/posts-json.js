import fs from 'fs'; // Import the file system module so the app can read JSON data files.
import path from 'path'; // Import the path module to build file paths reliably across the environment.

const dataDir = path.join(process.cwd(), 'data'); // Point to the app's data folder inside the project root.

export function getSortedPostsData() { // Create a function that returns posts sorted by title.
    const filePath = path.join(dataDir, 'post.json'); // Build the full path to the posts JSON file.
    const jsonString = fs.readFileSync(filePath, 'utf8'); // Read the JSON file as a string.
    const jsonObj = JSON.parse(jsonString); // Parse the JSON text into a JavaScript array.
    jsonObj.sort(function (a, b) { // Sort the array alphabetically by the title field.
        return a.title.localeCompare(b.title); // Compare two titles to determine order.
    });
    return jsonObj.map(item => { // Transform each item to a simplified object used by the UI.
        return {
          id: item.id.toString(), // Convert the numeric ID into a string for route matching.
          title: item.title, // Keep the post title.
          date: item.date // Keep the publication date.
        }
      });
}

export function getAllPostIds() { // Create a function to generate all dynamic post route IDs.
    const filePath = path.join(dataDir, 'post.json'); // Build the path to the JSON file again.
    const jsonString = fs.readFileSync(filePath, 'utf8'); // Read the JSON data.
    const jsonObj = JSON.parse(jsonString); // Parse the JSON content into an array.
    console.log(jsonObj); // Log the full JSON object for debugging.
    return jsonObj.map(item => { // Map every item to a route object for Next.js static paths.
        return {
          params: {
            id: item.id.toString() // Use the string version of the ID in the route.
          }
        }
      });
}

export function getPostData(id) { // Create a function that fetches one post by its ID.
    const filePath = path.join(dataDir, 'post.json'); // Build the file path for the data source.
    const jsonString = fs.readFileSync(filePath, 'utf8'); // Read the JSON file as text.
    const jsonObj = JSON.parse(jsonString); // Parse the JSON text into an array.
    const objReturned = jsonObj.filter(obj => { // Filter the array down to the matching post.
        return obj.id.toString() === id; // Match the provided ID with the stored post ID.
      });
      if (objReturned.length === 0) { // Check if no post matched the requested ID.
        return {
          id: id, // Return the requested ID even when not found.
          title: 'Not found', // Provide a fallback title.
          date: '', // Provide an empty date string.
          contentHtml: 'Not found' // Provide a fallback HTML message.
        }
      } else { // Otherwise return the matching post.
        return objReturned[0]; // Return the first matching entry.
      }
}