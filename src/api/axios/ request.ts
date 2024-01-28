// request.ts
import { AxiosResponse } from "axios";
import axios from "./index";
export class Request {
  static request = (
    method: string,
    url: string,
    data: any
  ): Promise<AxiosResponse> => {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios({
        url,
        method,
        ...data,
      })
        .then((res: AxiosResponse) => {
          console.log("成功", res);

          resolve(res);
        })
        .catch((err) => {
          console.log("发起请求失败");
          reject(err);
        });
    });
  };
  /**
   * get方法
   * @param {string} url 路径
   * @param {object} data 参数和配置
   */
  static get = (url: string, data?: any): Promise<AxiosResponse> => {
    return this.request("get", url, data);
  };
  /**
   * post方法
   * @param {string} url 路径
   * @param {object} data 参数和配置
   */
  static post = (url: string, data?: any): Promise<AxiosResponse> => {
    return this.request("post", url, data);
  };
  /**
   * put方法
   */
  static put = (url: string, data?: any): Promise<AxiosResponse> => {
    return this.request("put", url, data);
  };
  /**
   * delete方法
   * @param {string} url 路径
   * @param {object} data 参数和配置
   */
  static delete = (url: string, data?: any): Promise<AxiosResponse> => {
    return this.request("delete", url, data);
  };
}

