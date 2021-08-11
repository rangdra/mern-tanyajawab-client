import { FC, useEffect } from 'react';
import axios from '../config/axios';

import Layout from '../components/Layout';
import Questions from '../components/Questions';
import { login } from '../features/auth/authSlice';
import { IResponse } from '../interface';
import { useAppDispatch, useAppSelector } from '../store';

const Home: FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

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
    <Layout title="TanyaJWB.id">
      <Questions />
    </Layout>
  );
};

export default Home;
