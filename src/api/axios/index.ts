import axios, { AxiosRequestConfig, Method } from "axios";
import { useUserStore } from "@/store/user";
import api from "@/api/index";

//异常对象接口
interface ERROR_OBJ {
  [key: string | number]: string; // 字段扩展声明
}

// 定义接口
interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: any;
}

const errorObj: ERROR_OBJ = {
  400: "参数缺失",
  401: '登录失效,请重新登陆!',
  403: '登录过期,请重新登陆!',
  404: "请求的资源不存在",
  405: "请求类型错误",
  406: "请求格式错误",
  408: "请求超时,请稍后重试！",
  500: "服务器错误,请稍后重试！",
  502: "网关错误",
  503: "服务器暂时过载或维护",
};

// 取消重复请求
const pending: Array<PendingType> = [];

/* 实例化请求配置 */
const instance = axios.create({
  // 请求时长
  timeout: 1000 * 20,
  // 请求的base地址 TODO:这块以后根据不同的模块调不同的api
  baseURL: import.meta.env.VITE_APP_API_URL,
  // 表示跨域请求时是否需要使用凭证
  withCredentials: true,
});

// http request 请求拦截器
// instance.interceptors.request.use(
//   config => {
//     // 这里判断localStorage里面是否存在token，如果有则在请求头里面设置
//     if (localStorage.jwtToken) {
//       config.headers.Authorization = getLocalStorage("jwtToken");
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )

/**
 * 请求拦截器
 * 功能：配置请求头
 */
instance.interceptors.request.use((config) => {
    if (!(localStorage.token === 'undefined')) {
      config.headers.Authorization  = `Bearer ${localStorage.token}`;
    }
    // if (config.url.includes('upload')) {
    //   config.headers.Accept = 'application/json';
    //   config.headers['Content-Type'] = 'multipart/form-data';
    // }
    return config;
  },
  (error) => {
    console.error('网络错误，请稍后重试');
    return Promise.reject(error);
  },
);

/**
 * http response 响应拦截器
 */
instance.interceptors.response.use(res => res,
  error => {
    if(error.response.data.status===500&&(error.response.data.message==='token out time'||error.response.data.message==='登录失败或未登录')){
      api.logout();
      useUserStore.caller()
      window.location.href = import.meta.env.VITE_APP_OOS_URL;
    }
    const err = error.response.data.message;
    let msg: Promise<any> = Promise.reject(new Error('HTTP: 服务器遇到错误, 无法完成请求.'))
    if (err !== '' && err !== null && err !== undefined) {
      ElMessage.error('请求错误', error.response.data.message)
      msg = Promise.reject(error.response.data)
    }
    return msg;
  })

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: any) => {
  const httpCode = status.response.status;
  console.log(httpCode)
  //这里处理 需要token鉴权的接口
  return Promise.reject();
};

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  Object.keys(pending).forEach(key => {
    const item: number = +key;
    const list: PendingType = pending[key];
    // 当前请求在数组中存在时执行函数体
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel("操作太频繁，请稍后再试");
      // 从数组中移除记录
      pending.splice(item, 1);
    }
  })
};

export { instance, errorObj, errorHandle, removePending };