import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#fff" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Public+Sans&display=swap"
            rel="stylesheet"
          />
          <meta name="application-name" content="ERPWeb PWA" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="ERPWeb PWA" />
          <meta name="description" content="PWA Application for ERPWeb" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/icons/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://twitter.com/iGugaLee" />
          <meta name="twitter:title" content="ERPWeb PWA" />
          <meta name="twitter:description" content="PWA Application for ERPWeb" />
          <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="ERPWeb PWA" />
          <meta property="og:description" content="PWA Application for ERPWeb" />
          <meta property="og:site_name" content="ERPWeb PWA" />
          <meta property="og:url" content="https://yourdomain.com" />
          <meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
