<template>
  <div class="login">
    <el-form ref="formRef" :model="form" :rules="rules" :label-width="80" class="form">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="用户名"  />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"  />
    </el-form-item>
    <div style="display: flex;justify-content: center;width: 100%;">
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </div>
  </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { getKey, login } from "../api/user"
import { encrypt } from "../utils/login"
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
const form = reactive({
  username: '',
  password: ''
})

const formRef = ref()

const rules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
}
const onSubmit = () => {
  formRef.value.validate((vaild) => {
    if (!vaild) return
    const user = {
      username: form.username,
      password: form.password
    }
    getKey().then(({data}) => {
      user.password = encrypt(user.password ,data.key)
      return login(user)
    }).then(({data}) => {
      ElMessage.success('登录成功')
      userStore.setToken(data.token)
      router.replace('/operate')
    })
  })
  
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .form {
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: var(--el-fill-color-light);
    width: 50%;
    min-width: 300px;
    max-width: 400px;
  }
}
</style>