import { FC, useEffect } from 'react';
import axios from '../config/axios';
import { GetServerSideProps } from 'next';

import Layout from 'components/Layout';
import Questions from 'components/Questions';
import { IQuestion } from 'interface';
import { useAppDispatch } from 'store';
import {
  populateQuestions,
  populateTopQuestions,
} from 'store/actions/questionActions';

const Home: FC<{ questions: IQuestion[] }> = ({ questions }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    populateQuestions(questions, dispatch);
    populateTopQuestions(dispatch);
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
