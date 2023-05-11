import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Chatbot from '../components/Chatbot';

const Home: NextPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <Head>
        <title>SoulGuru</title>
        {/* TO DO: Edit this meta tag */}
        <meta name="description" content="DreamMeanings" />
      </Head>

      {/* Mailchimp popup form HTML */}
      <Script
        id="mcjs"
        strategy="lazyOnload"
        src="https://chimpstatic.com/mcjs-connected/js/users/9ad191aa4d7af66b6d1dd437d/f3a92ce48f0773837771dbebe.js"
      />

      <main className="mx-auto">
        <div className="w-full">
          <Chatbot />
        </div>
      </main>
    </div>
  );
};

export default Home;
