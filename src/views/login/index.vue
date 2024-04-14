<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="4"></el-col>
      <el-col :span="12" :xs="20">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到甄选平台</h2>
          <div class="box">
            <el-form-item prop="username">
              <el-input type="text" :prefix-icon="User" v-model="loginForm.username" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password />
            </el-form-item>
            <el-button class="login_btn" type="primary" @click="login" :loading="loading">登录</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
//引入时间判断工具
import { getTime } from '@/utils/time'
let useStore = useUserStore()
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
//定义变量控制按钮加载效果
let loading = ref(false)
//获取路由器
let $router = useRouter()
//获取el-form组件
let loginForms = ref()
//登录按钮回调
const login = async () => {
  //保证全部表单相校验通过再发请求
  await loginForms.value.validate()
  //加载效果:开始加载
  loading.value = true

  try {
    //保证登录成功
    await useStore.userLogin(loginForm)
    //编程式导航跳转到展示数据首页
    $router.push('/')
    //登录成功提示信息
    ElNotification({
      type: 'success',
      title: `Hi,${getTime()}好`,
      message: '欢迎回来',
    })
    //登录成功加载效果也消失
    loading.value = false
  } catch (error) {
    //登录失败加载效果消息
    loading.value = false
    //登录失败的提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
//自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //函数:如果符合条件callBack放行通过即为
  //如果不符合条件callBack方法,注入错误提示信息
  if (/^[A-Za-z0-9]{5,10}$/.test(value)) {
    callback()
  } else {
    callback(new Error('账号长度为5~10位，且由数字和字母组成'))
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}

//定义表单校验需要配置对象
const rules = {
  //规则对象属性:
  //required,代表这个字段务必要校验的
  //min:文本长度至少多少位
  //max:文本长度最多多少位
  //message:错误的提示信息
  //trigger:触发校验表单的时机 change->文本发生变化触发校验,blur:失去焦点的时候触发校验规则
  username: [
    // { required: true, min: 5, max: 10, message: '账号长度应为5~10位', trigger: 'change' }
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    // { required: true, min: 6, max: 15, message: '密码长度应为6~15位', trigger: 'change' }
    { trigger: 'change', validator: validatorPassword },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat center;
  background-size: cover;
  .login_form {
    position: relative;
    top: 30vh;
    width: 80%;
    // background: url('@/assets/images/login_form') no-repeat center;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 40px;
    color: white;
    h1 {
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
      margin: 20px 0;
    }
    .box {
      margin: 0 10%;
      .login_btn {
        width: 100%;
      }
    }
  }
}
</style>
