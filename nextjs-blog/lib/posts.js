import fs from 'fs'; // Import the filesystem module for reading data from disk.
import path from 'path'; // Import the path module for working with file paths.

const dataDir = path.join(process.cwd(), 'data'); // Set the folder that contains the blog data files.

export function getSortedPostsData() { // Define a function to sort and return all post data.
  const filePath = path.join(dataDir, 'post.json'); // Build the full path to the JSON data file.
  const jsonString = fs.readFileSync(filePath, 'utf8'); // Read the JSON file as a text string.
  const jsonObj = JSON.parse(jsonString); // Convert the JSON text into a JavaScript object.
  jsonObj.sort(function (a, b) { // Sort posts alphabetically by title.
    return a.title.localeCompare(b.title); // Compare titles to determine sort order.
});
}

export function getAllPostIds() { // Define a function that returns route params for every post.
  const fileNames = fs.readdirSync(postsDirectory); // Read all files in the posts folder.
  return fileNames.map((fileName) => { // Map each file name into a Next.js dynamic route object.
    return {
      params: {
        id: fileName.replace(/\.md$/, ''), // Remove the .md extension to use the post ID.
      },
    };
  });
}

export async function getPostData(id) { // Define a function to load individual post content by ID.
  const fullPath = path.join(postsDirectory, `${id}.md`); // Build the markdown file path for the selected post.
  const fileContents = fs.readFileSync(fullPath, 'utf8'); // Read the post file content as text.

  // Use gray-matter to parse the post metadata section // Parse the front matter section of the markdown file.
  const matterResult = matter(fileContents); // Extract metadata and the content body from the markdown.

  // Use remark to convert markdown into HTML string // Convert the markdown body into HTML markup.
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content); // Process the markdown content with the HTML plugin.
  const contentHtml = processedContent.toString(); // Convert the processed markdown output into an HTML string.

  // Combine the data with the id and contentHtml // Merge the post ID, HTML content, and metadata into one object.
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}