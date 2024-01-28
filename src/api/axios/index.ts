import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
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
  // 401: '登录失效,请重新登陆!',
  // 403: '登录过期,请重新登陆!',
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
  // baseURL: process.env.VUE_APP_API_URL,
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false,
});
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: any) => {
  const httpCode = status.response.status;

  //这里处理 需要token鉴权的接口
  return Promise.reject();
};

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
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
  }
};