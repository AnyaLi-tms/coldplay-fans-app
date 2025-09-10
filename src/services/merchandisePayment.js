import api from './api';

//获取商品信息
export async function getMerchandiseById(id) {
  try {
    const response = await api.get(`merchandises/${id}`);
    return response;
  } catch (err) {
    return err?.response || { data: { success: false, message: err.message } };
  }
}
//提交订单
export async function submitMerchandisePayment(info) {
  try {
    const response = await api.put('merchandises', info);
    return response;
  } catch (err) {
    return err?.response || { data: { success: false, message: err.message } };
  }
}
