//进行axios二次封装：使用请求与响应拦截器
import axios from 'axios'
//这里波浪线出现不影响使用
import { ElMessage } from 'element-plus'
//第一步：利用axios对象的create方法，去创建axios实例(配置:基础路径、超时时间)
//axios与request的区别在于有没拦截器
const request = axios.create({
  //基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    //config配置对象，headers属性请求头，经常给服务器端携带公共参数
    config.headers.token = '123'
    console.log(config)
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    //简化数据
    // console.log(response.data)
    return response.data
    // return response
  },
  function (error) {
    //失败回调：处理http网络错误的
    //定义一个变量：存储网络错误信息
    let message = ''
    //http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'Token过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    //提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

export default request
