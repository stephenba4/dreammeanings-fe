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
    <div>
      <Head>
        <title>SoulGuru</title>
        {/* TO DO: edit this meta tag */}
        <meta
          name="description"
          content="SoulGuru: Explore Spirituality and Find Answers to Life's Biggest Questions"
        />
      </Head>

      {/* Your Mailchimp form HTML goes here */}
      <Script
        id="mcjs"
        strategy="lazyOnload"
        src="https://chimpstatic.com/mcjs-connected/js/users/9ad191aa4d7af66b6d1dd437d/f3a92ce48f0773837771dbebe.js"
      />

      <main className="min-h-screen bg-gray-200 py-10">
        <div className="container mx-auto px-4">
          {/* TO DO: edit the title and subtitle */}
          <h1 className="text-4xl font-bold mb-2 text-center text-teal-500">
            SoulGuru
          </h1>
          <h2 className="text-lg font-medium mb-10 text-center text-gray-500 max-w-lg mx-auto">
            Explore Spirituality and Find Answers to Life{"'"}s Biggest
            Questions
          </h2>
          <Chatbot />
        </div>
      </main>
    </div>
  );
};

export default Home;
