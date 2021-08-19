import { FC, ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useAppDispatch } from 'store';
import Navbar from './Navbar';
import { checkUser } from 'store/actions/userAction';

type IDefaultProps = {
  title?: string;
  children: ReactNode;
};
const Layout: FC<IDefaultProps> = ({
  children,
  title = 'Welcome To TanyaJawab',
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    checkUser(dispatch);
  }, [dispatch]);
  return (
    <>
      <Head>
        <title>
          {router.pathname !== '/' ? title + ' | TanyaJawab' : title}
        </title>
      </Head>
      <Navbar />

      <main className="w-full px-8 mx-auto my-8 md:w-1/2">{children}</main>
    </>
  );
};

export default Layout;
