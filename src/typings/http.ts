import type {
  Axios,
  AxiosInterceptorManager,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

export interface ResponseData {
  message?: string; // 兼容bsp返回数据格式报错
  code: number;
  data: any;
  msg?: string;
  secret?: boolean;
}

/** 拓展AxiosRequestConfig类型定义 */
export interface NewAxiosRequestConfig<D = ResponseData>
  extends AxiosRequestConfig<D> {
  startTime?: number;
  endTime?: number;
  /** 为true, 则接口返回标准 HTTP 错误时不展示错误弹窗 */
  notShowNotificationIfError?: boolean;
  /** 为true,则路由变化时不自动取消请求 */
  notAbortWhenPathnameChange?: boolean;
  /** 为true, 则接口返回返回code为非0时，不需要显示错误弹窗 */
  notShowNotificationIfResCodeNotSuc?: boolean;
}

// /** 拓展AxiosResponse类型定义 */
// export interface NewAxiosResponse<T= ResponseData > extends AxiosResponse<T> {
//   /** 接口返回错误，不展示错误弹窗 */
//   notShowNotificationIfError?: boolean;
//   /** 路由变化时，不自动取消请求 */
//   notAbortWhenPathnameChange?: boolean;
// }

/** 拓展Axios类型定义 */
interface NewAxios extends Axios {
  interceptors: {
    request: AxiosInterceptorManager<NewAxiosRequestConfig>;
    response: AxiosInterceptorManager<
      AxiosResponse<ResponseData> & {
        config: NewAxiosRequestConfig;
      }
    >;
  };
  get: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: NewAxiosRequestConfig<D>
  ) => Promise<R>;
  post: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: NewAxiosRequestConfig<D>
  ) => Promise<R>;
  delete: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: NewAxiosRequestConfig<D>
  ) => Promise<R>;
}

/** 拓展AxiosInstance类型定义 */
export interface NewAxiosInstance extends NewAxios {
  (config: NewAxiosRequestConfig): AxiosPromise;
  (url: string, config?: NewAxiosRequestConfig): AxiosPromise;
}
