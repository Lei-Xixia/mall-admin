import axios from "axios";

const instance = axios.create({
  baseURL: "https://mallapi.duyiedu.com/",
});
// 请求拦截
instance.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    if(response.data.status === "fail"){
      return Promise.reject(response.data.msg)
    }else{
      return response.data.data;
    }
  },
  (error) => Promise.reject(error)
);

export default instance;