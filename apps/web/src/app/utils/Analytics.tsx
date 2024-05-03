'use client'

import Head from "next/head";
import Script from "next/script";

export default function Analytics() {
    return (
        <>
            {process.env.GTM_ID ? (
                <>
                    <Head>
                        <link rel="preconnect" href="https://www.googletagmanager.com" />
                    </Head>
                    <Script
                        id="GTM_TAG"
                        type="text/javascript"
                        dangerouslySetInnerHTML={{
                            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.GTM_ID}');
              `
                        }}
                    />

                    <Script type="text/javascript" id="hs-script-loader" src="//js-na1.hs-scripts.com/24052454.js" />

                    <noscript>
                        <iframe
                            title="GTM-NOSCRIPT"
                            src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}`}
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                </>
            ) : null}
        </>
    )
}