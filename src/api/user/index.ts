//统一管理项目用户相关的接口
import request from '@/utils/request'
import type {

    loginFormData,
   
    loginResponseData,
   
    userInfoReponseData,
   
   } from './type'
//统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}
//暴露请求函数
export const reqLogin=(data)=>request.post(API.LOGIN_URL,data);
export const reqUserInfo=()=>request.get(API.USERINFO_URL);