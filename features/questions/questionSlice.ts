import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuestion } from '../../interface';

interface QuestionState {
  data: [] | IQuestion[];
  myData: [] | IQuestion[];
  loading: boolean;
  currentSlug: string | number;
  detailQuestion: IQuestion | null;
}

const initialState: QuestionState = {
  data: [],
  loading: true,
  currentSlug: '',
  myData: [],
  detailQuestion: null,
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
      state.myData = action.payload;
      state.loading = false;
    },
    getDetailQuestion: (state, action: PayloadAction<IQuestion | null>) => {
      state.detailQuestion = action.payload;
      state.loading = false;
    },
    deleteQuestion: (state, action) => {
      const newQuestions = state.data.filter((q) => q._id !== action.payload);
      state.data = newQuestions;
      state.loading = false;
    },
    setCurrentSlug: (state, action) => {
      state.currentSlug = action.payload;
    },
  },
});

export const {
  getQuestions,
  deleteQuestion,
  setCurrentSlug,
  getMyQuestions,
  getDetailQuestion,
} = questionSlice.actions;

export default questionSlice.reducer;
