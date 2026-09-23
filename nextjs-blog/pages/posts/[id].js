import Layout from '../../components/layout'; // Import the shared page layout component.
import { getAllPostIds, getPostData } from '../../lib/posts-json.js'; // Import the static data helper functions for blog posts.
import Head from 'next/head'; // Import the Head component to set metadata for each post page.
import Date from '../../components/date'; // Import the Date component to format the post date.
import utilStyles from '../../styles/utils.module.css'; // Import the CSS module used for post page styling.

export default function Post({ postData }) { // Define the reusable blog post page component.
  return (
    <Layout> {/* Wrap the content in the shared site layout. */}
      <Head> {/* Add the post title to the document head. */}
        <title>{postData.title}</title> {/* Display the blog post title in the browser tab. */}
      </Head>
      <article> {/* Begin the article container for the post content. */}
        <h1 className={utilStyles.headingXl}>{postData.title}</h1> {/* Show the main post heading. */}
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} /> {/* Format and display the post date. */}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> {/* Render the HTML content for the post body. */}
      </article>
    </Layout>
  ); // Return the JSX structure for the post page.
}

export async function getStaticPaths() { // Define the dynamic routes to pre-render for all blog posts.
  const paths = getAllPostIds(); // Get the list of all post IDs from the data source.
  console.log(paths); // Log the generated paths for debugging.
  return {
    paths, // Pass the list of routes to Next.js.
    fallback: false, // Do not generate fallback pages for missing posts.
  };
}

export async function getStaticProps({ params }) { // Fetch the correct post data for each static route.
  const postData = await getPostData(params.id); // Look up the selected post by route parameter.
  return {
    props: {
      postData, // Pass the resolved post data into the page component.
    },
  };
}
