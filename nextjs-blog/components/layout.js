import Head from 'next/head'; // Import the Next.js Head component for page metadata.
import Image from 'next/image'; // Import Next.js image optimization for profile photos.
import Script from 'next/script'; // Import the Script component for loading third-party scripts.

import styles from './layout.module.css'; // Import the layout-specific CSS module.
import utilStyles from '../styles/utils.module.css'; // Import shared utility styles used across the app.
import Link from 'next/link'; // Import the Next.js Link component for client-side navigation.

const name = '[Renee]'; // Store the site owner's name for display in the header.
export const siteTitle = 'Next.js Sample Website'; // Define the default page title used in metadata.

export default function Layout({ children, home }) { // Create the shared page layout component with children and home state.
  return (
    <div className={styles.container}> {/* Wrap the overall layout in the main container class. */}
      <Head> {/* Add page metadata tags to the document head. */}
        <link rel="icon" href="/favicon.ico" /> {/* Set the browser tab icon. */}
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        /> {/* Add a general page description for search engines and previews. */}
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        /> {/* Create the social sharing preview image URL. */}
        <meta name="og:title" content={siteTitle} /> {/* Set the Open Graph title. */}
        <meta name="twitter:card" content="summary_large_image" /> {/* Set the Twitter card preview format. */}
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      /> {/* Load the Facebook SDK when the page is ready. */}
      <header className={styles.header}> {/* Render the header containing branding and navigation. */}
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            /> {/* Show the hero profile image on the home page. */}
            <h1 className={utilStyles.heading2Xl}>{name}</h1> {/* Display the large site name heading on the home page. */}
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              /> {/* Show the smaller profile image on interior pages. */}
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link> {/* Link the site name back to the home page. */}
            </h2>
          </>
        )}
      </header>
      <main>{children}</main> {/* Render the page content passed in from the parent component. */}
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link> {/* Show a return link when the page is not the home page. */}
        </div>
      )}
    </div>
  ); // Return the completed layout JSX for the page.
}
