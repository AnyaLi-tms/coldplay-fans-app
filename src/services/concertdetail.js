import api from './api';

// 获取演唱会详情
export function fetchConcertDetail(id) {
  return api
    .get(`/concerts/${id}`)
    .then((response) => (response.data ? response.data : response));
}
