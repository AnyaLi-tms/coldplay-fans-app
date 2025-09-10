import api from './api';

// 获取题库
export const fetchQuizList = async () => {
  const res = await api.get('/question');
  return res.data;
};

// 校验答案
// answers: [{ questionId, answer }]
export const checkQuizAnswers = async (answers) => {
  const res = await api.post('/question', answers);
  return res.data; // { correct: true/false }
};
