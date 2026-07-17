import Head from "next/head";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Head>
        <title>Clone TabNews</title>
        <script
          src="//collect.vendavalida.com.br/push.js"
          async
          type="text/javascript"
        ></script>
        <script
          src="//collect.vendavalida.com.br/helpers/vvcheckout.js"
          async
          type="text/javascript"
        ></script>
      </Head>

      <main>
        <h1>Site em construcao</h1>
      </main>
    </>
  );
}
