import { Fragment } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Tags } from '../components';

const { NODE_ENV, GA_TRACKING_ID } = process.env;
const isProduction = NODE_ENV === 'production';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="fi">
        <Head>
          <Tags />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
