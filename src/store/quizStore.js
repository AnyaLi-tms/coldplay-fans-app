import { create } from 'zustand';
import { fetchQuizList, checkQuizAnswers } from '../services/quiz';

export const useQuizStore = create((set) => ({
  quizList: [],
  quizValues: [], // 用户选择的答案
  quizLoading: false,
  quizWarning: '',
  quizVisible: false,
  async loadQuiz() {
    set({ quizLoading: true });
    try {
      const list = await fetchQuizList();
      set({
        quizList: list,
        quizValues: Array(list.length).fill(''),
        quizLoading: false,
      });
    } catch (e) {
      set({ quizLoading: false });
    }
  },
  setQuizValue(idx, val) {
    set((state) => {
      const arr = [...state.quizValues];
      arr[idx] = val;
      return { quizValues: arr };
    });
  },
  setQuizWarning(warning) {
    set({ quizWarning: warning });
  },
  setQuizVisible(visible) {
    set({ quizVisible: visible });
  },
  resetQuiz() {
    set((state) => ({
      quizValues: Array(state.quizList.length).fill(''),
      quizWarning: '',
    }));
  },
  checkAnswers: async () => {
    // 这里的get是Zustand的全局状态读取
    const { quizList, quizValues } = useQuizStore.getState();
    const answers = quizList.map((q, idx) => ({
      answer: quizValues[idx],
      questionId: q.questionId,
    }));
    return await checkQuizAnswers(answers);
  },
}));
