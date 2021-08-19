import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuestion } from 'interface';

interface QuestionState {
  data: [] | IQuestion[];
  myQuestions: [] | IQuestion[];
  topQuestions: [] | IQuestion[];
  loading: boolean;
  currentSlug: string;
  detailQuestion: IQuestion | null;
}

const initialState: QuestionState = {
  data: [],
  loading: true,
  currentSlug: '',
  myQuestions: [],
  detailQuestion: null,
  topQuestions: [],
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    getQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.data = action.payload;
      state.loading = false;
    },
    getMyQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.myQuestions = action.payload;
      state.loading = false;
    },
    getDetailQuestion: (state, action: PayloadAction<IQuestion | null>) => {
      state.detailQuestion = action.payload;
      state.loading = false;
    },
    deleteQuestion: (state, action) => {
      const newQuestions = state.data.filter((q) => q._id !== action.payload);
      state.data = newQuestions;
      state.myQuestions = newQuestions;
      state.loading = false;
    },
    setCurrentSlug: (state, action) => {
      state.currentSlug = action.payload;
    },
    getTopQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.topQuestions = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getQuestions,
  deleteQuestion,
  setCurrentSlug,
  getMyQuestions,
  getDetailQuestion,
  getTopQuestions,
} = questionSlice.actions;

export default questionSlice.reducer;
