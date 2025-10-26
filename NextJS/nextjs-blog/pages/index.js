import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts'
import {useEffect, useState } from 'react'
 
export default function Home({ allPostsData }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('/api/hello')
        .then((res) => res.json())
        .then((data) => setData(data));
      }, 2000)
      return () => clearTimeout(timer);
    }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>Home Page</h1>
      <p>{data ? data.message : 'Loading...'}</p>

      <section className={utilStyles.headingMd}>
        <p>Joshua De Leon Hyeyeyeyye</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}