import Head from 'next/head';
import { FC, ReactNode } from 'react';

import Navbar from './Navbar';

const defaultProps = {
  title: 'Welcome To TanyaJawab',
};
type IDefaultProps = {
  title?: string;
  children: ReactNode;
} & typeof defaultProps;

const Layout: FC<IDefaultProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title} | TanyaJawab</title>
      </Head>
      <Navbar />

      <main className="px-8 my-8 md:px-12">{children}</main>
    </>
  );
};

export default Layout;

Layout.defaultProps = defaultProps;
