<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="Approved by">
      <el-input v-model="formInline.username" placeholder="Approved by" clearable />
    </el-form-item>
    <el-form-item label="Approved by">
      <el-input v-model="formInline.password" placeholder="Approved by" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from "vue";
import { getKey, login } from "../api/user"
import { encrypt } from "../utils/login"

const formInline = reactive({
  username: '',
  password: ''
})
const onSubmit = () => {
  const user = {
    username: formInline.username,
    password: formInline.password
  }
  getKey().then(({data}) => {

    user.password = encrypt(user.password ,data.key)
    return login(user)
  }).then(({data}) => {
    localStorage.setItem("token", data.token)
  })
}
</script>

<style>

</style>