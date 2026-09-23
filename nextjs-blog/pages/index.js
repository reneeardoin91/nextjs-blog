import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts-json.js';
import Link from 'next/link';
import Date from '../components/date';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[My name is Renee, I am a 35 year old full stack developer student at Santa Rosa Junior College]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.) {/* Show the sample website description and tutorial link. */}
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}> {/* Render the blog list section. */}
        <h2 className={utilStyles.headingLg}>Blog</h2> {/* Display the blog section heading. */}
        <ul className={utilStyles.list}> {/* Create the unordered list for blog entries. */}
          {allPostsData.map(({ id, date, title }) => ( // Loop over each post and build a list item.
            <li className={utilStyles.listItem} key={id}> {/* Create each blog list item. */}
              <Link href={`/posts/${id}`}>{title}</Link> {/* Link each post title to its individual post page. */}
              <br /> {/* Add a line break between the title and date. */}
              <small className={utilStyles.lightText}>
                <Date dateString={date} /> {/* Format and display the post date. */}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  ); // Return the JSX for the homepage.
}

export async function getStaticProps() { // Pre-render the homepage data at build time.
  const allPostsData = getSortedPostsData(); // Fetch the sorted list of posts from JSON.
  return {
    props: {
      allPostsData, // Pass the post data into the page component.
    },
  }; // Return the props object for static rendering.
}
