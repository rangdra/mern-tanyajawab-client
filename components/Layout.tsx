import Head from 'next/head';
import { FC, ReactNode } from 'react';
import Navbar from './Navbar';

type IDefaultProps = {
  title?: string;
  children: ReactNode;
} & typeof defaultProps;

const defaultProps = {
  title: 'Welcome To TanyaJawab',
};
const Layout: FC<IDefaultProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title} | TanyaJawab</title>
      </Head>
      <Navbar />

      <main className="container px-8 mt-8 md:px-12 md:mx-auto">
        {children}
      </main>
    </>
  );
};

export default Layout;

Layout.defaultProps = defaultProps;
