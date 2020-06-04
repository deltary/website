
import { Fragment } from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/gtag';
import { Tags } from '../components';

export default class MyDocument extends Document {
  static async getInitalProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    const isProduction = process.env.NODE_ENV === 'production';

    return {
      ...initialProps,
      isProduction
    }
  }

  render() {
    const { isProduction } = this.props;

    return (
      <html lang="fi">
        <Head>          
          <Tags />
          {isProduction && (
            <Fragment>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
              <script 
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${GA_TRACKING_ID}');
                  `,
                }} 
              />
            </Fragment>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}


