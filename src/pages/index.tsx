import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import Head from 'next/head';
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
        <meta name="description" content="SoulGuru: Unlock Your Inner Wisdom" />
        {/* Your Mailchimp form HTML goes here */}
        <script
          id="mcjs"
          dangerouslySetInnerHTML={{
            __html: `
                !function(c,h,i,m,p)
                {
                  ((m = c.createElement(h)),
                  (p = c.getElementsByTagName(h)[0]),
                  (m.async = 1),
                  (m.src = i),
                  p.parentNode.insertBefore(m, p))
                }
                (document,"script","https://chimpstatic.com/mcjs-connected/js/users/9ad191aa4d7af66b6d1dd437d/a3a0c52b94f73af4648ed67cf.js");
              `,
          }}
        />
      </Head>

      <main className="min-h-screen bg-gray-200 py-10">
        <div className="container mx-auto">
          {/* TO DO: edit the title and subtitle */}
          <h1 className="text-4xl font-bold mb-2 text-center text-teal-500">
            SoulGuru
          </h1>
          <h2 className="text-lg font-medium mb-10 text-center text-gray-500">
            Unlock Your Inner Wisdom
          </h2>
          <Chatbot />
        </div>
      </main>
    </div>
  );
};

export default Home;
