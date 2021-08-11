import axios from '../config/axios';
import { FC, useEffect } from 'react';
import Layout from '../components/Layout';
import { login } from '../features/auth/authSlice';
import { increment } from '../features/counter/counterSlice';
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
    <Layout title="Welcome To TanyaJawab">
      <h1 className="text-blue-500">Test</h1>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>tambah</button>
    </Layout>
  );
};

export default Home;
