import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>{/* Other head content */}</Head>
      <body>
        <Main />
        <NextScript />
        {/* Google Analytics script that is applied to all pages of app */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-18R1PWW4Y7"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-18R1PWW4Y7');
            `,
          }}
        />
      </body>
    </Html>
  );
}
