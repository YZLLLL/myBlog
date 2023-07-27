import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import jwt from 'jsonwebtoken-browser';
// todo 下载一个 浏览器端 解析jwt的库

const secretKey = 'yeziliang';

function getToken () {
  return (localStorage.getItem("token") || '').split(' ')[1]
}

function getUser() {
  const token = getToken();
  if(token) return {}
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded; // Decoded JWT payload
  } catch (err) {
    console.error(err);
    return {}
  }
}

export const useUserStore = defineStore('group', () => {
  
  const user = ref(getUser())
  const group = ref({})
  const setGroup = () => {
    user.value = getUser()
  }
  return { group, setGroup }
})
