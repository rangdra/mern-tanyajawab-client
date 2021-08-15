import Head from 'next/head';
import { FC, ReactNode, useEffect } from 'react';
import { IResponse } from '../interface';
import { useAppDispatch } from '../store';
import axios from '../config/axios';

import Navbar from './Navbar';
import { login } from '../features/auth/authSlice';
import { useRouter } from 'next/router';

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
    const checkUserLogin = async () => {
      try {
        const res: IResponse = await axios.get('/auth/me');
        dispatch(login(res.user));
      } catch (error) {
        console.log(error.response.data);
      }
    };

    checkUserLogin();
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
