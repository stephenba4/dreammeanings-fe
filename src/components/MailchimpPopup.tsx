import { useEffect } from 'react';
import Head from 'next/head';

const MailchimpPopup = (): JSX.Element => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Head>
        <title>Subscribe to our Newsletter</title>
      </Head>
      <div
        id="mc_embed_signup"
        className="flex justify-center items-center h-screen bg-gray-900 bg-opacity-50 fixed inset-0 z-50"
      >
        <form
          action="YOUR_MAILCHIMP_API_ENDPOINT"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="w-full max-w-sm p-6 bg-white rounded-lg"
          target="_blank"
          noValidate
        >
          <h2 className="text-2xl font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <div id="mc_embed_signup_scroll">
            {/* Your Mailchimp form HTML goes here */}
          </div>
        </form>
      </div>
    </>
  );
};

export default MailchimpPopup;
