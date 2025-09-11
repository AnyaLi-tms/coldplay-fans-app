import api from './api';

//获取库存
export async function getStocks() {
  try {
    const response = await api.get('merchandises/count');
    return response;
  } catch (err) {
    return err?.response || { data: { success: false, message: err.message } };
  }
}
//提交订单
export async function submitMerchandisePayment(info) {
  try {
    const response = await api.put('merchandises/buyMerchandise', info);
    return response;
  } catch (err) {
    return err?.response || { data: { success: false, message: err.message } };
  }
}
