export default function validateIdCard(id) {
  // 简单校验（18位中国身份证）
  return /^[1-9]\d{5}(19\d{2}|20[0-2]\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/.test(
    id,
  );
}
