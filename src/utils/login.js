import JsEncrypt from "jsencrypt";
let jsEncrypt = new JsEncrypt();

export const encrypt = function (obj, key) {
  // 公钥
  jsEncrypt.setPublicKey(key);
  return jsEncrypt.encrypt(obj);
};
