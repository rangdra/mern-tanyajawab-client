import { FC, useEffect } from 'react';
import axios from '../config/axios';

import Layout from '../components/Layout';
import Questions from '../components/Questions';
import { login } from '../features/auth/authSlice';
import { IQuestion, IResponse } from '../interface';
import { useAppDispatch } from '../store';
import { GetServerSideProps } from 'next';
import { getQuestions } from '../features/questions/questionSlice';

const Home: FC<{ questions: IQuestion[] }> = ({ questions }) => {
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
    dispatch(getQuestions(questions));
  }, [dispatch, questions]);

  return (
    <Layout>
      <Questions />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get('/questions');
  return {
    props: {
      questions: res,
    },
  };
};

export default Home;
