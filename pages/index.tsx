import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-black ">
        <h1 className="text-2xl text-primary">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="bg-primaryLow text-primary">Get started by editing</p>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
