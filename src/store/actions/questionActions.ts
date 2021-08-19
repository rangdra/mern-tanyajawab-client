import axios from 'config/axios';
import { IQuestion } from 'interface';
import { NextRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AppDispatch } from 'store';
import {
  deleteQuestion,
  getMyQuestions,
  getQuestions,
  getTopQuestions,
  setCurrentSlug,
} from 'store/features/questions/questionSlice';
import { checkUser } from './userAction';

export const createQuestion = async (newQuestion: any, router: NextRouter) => {
  try {
    await axios.post('/questions', newQuestion);
    router.push('/');
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const editQuestion = async (
  data: any,
  currentSlug: string,
  router: NextRouter
) => {
  try {
    await axios.put(`/questions/${currentSlug}`, data);
    router.push('/');
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const populateQuestions = async (
  questions: IQuestion[],
  dispatch: AppDispatch
) => {
  dispatch(getQuestions(questions));
};

export const populateMyQuestions = async (dispatch: AppDispatch) => {
  try {
    const res: IQuestion[] = await axios.get('/questions/my');
    dispatch(getMyQuestions(res));
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const populateTopQuestions = async (dispatch: AppDispatch) => {
  try {
    const res: IQuestion[] = await axios.get('/questions/top');
    dispatch(getTopQuestions(res));
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const handleDeleteQuestion = async (
  id: any,
  dispatch: AppDispatch,
  router: NextRouter
) => {
  try {
    await axios.delete(`/questions/${id}`);
    dispatch(deleteQuestion(id));
    checkUser(dispatch);
    router.push('/');
  } catch (error) {
    console.log(error.response.data);
  }
};

export const handleEditQuestion = (
  slug: string,
  dispatch: AppDispatch,
  router: NextRouter
) => {
  dispatch(setCurrentSlug(slug));
  router.push('/questions/add');
};

export const handleVote = async (
  url: string,
  value: number,
  getData: () => void
) => {
  try {
    await axios.put(url, { value });
    getData();
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
