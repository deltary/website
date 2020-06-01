import { Fragment } from 'react';

function Tags() {
  return (
    <Fragment>
      {/* Primary Meta Tags */}
      <title>Delta ry</title>
      <meta name="title" content="Delta ry" />
      <meta name="description" content="Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys Delta ry" />
      <meta name="google-site-verification" content="fX3nwMLJdppvcaFwTnfvwRAldCOqC7ozG7OEfbBTJ6A" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <meta charSet="UTF-8" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://delta.utu.fi/" />
      <meta property="og:title" content="Delta ry" />
      <meta property="og:description" content="Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys Delta ry" />
      <meta property="og:image" content="/deltautufi_banner.jpg" />
      <meta property="og:site_name" content="Delta ry" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://delta.utu.fi/" />
      <meta property="twitter:title" content="Delta ry" />
      <meta property="twitter:description" content="Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys Delta ry" />
      <meta property="twitter:image" content="/deltautufi_banner.jpg" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Disable tap highlight on IE */}
      <meta name="msapplication-tap-highlight" content="no" />

      {/* Add browser theme color */}
      <meta name="theme-color" content="#551991" />
    </Fragment>
  );
}


export default Tags;