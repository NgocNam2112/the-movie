import axios, { AxiosInstance } from "axios";
import { BASE_API_URL, SERVER_TIMEOUT } from "../constants";

class AxiosClient {
  axiosClient: AxiosInstance;
  static axiosClientInstance: any;

  constructor() {
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    this.axiosClient = axios.create({
      baseURL: BASE_API_URL,
      headers,
      timeout: SERVER_TIMEOUT ? Number(SERVER_TIMEOUT) : 9000,
    });

    this.axiosClient.interceptors.request.use(
      (configure) => configure,
      (error) => Promise.reject(error)
    );

    this.axiosClient.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  static get instance() {
    if (!this.axiosClientInstance) {
      this.axiosClientInstance = new AxiosClient();
    }

    return this.axiosClientInstance;
  }

  //   setHeader = async (userToken = null) => {
  //     this.axiosClient.defaults.headers.Authorization = `Bearer ${userToken}`;
  //   };

  get = async (resource: string, config?: any) => {
    // let { headers } = config;
    // if (!headers) {
    //   headers = this.axiosClient.defaults.headers;
    // } else {
    //   headers = { ...this.axiosClient.defaults.headers, ...headers };
    // }

    return this.axiosClient.get(resource, {
      //   ...Object.assign({ headers }, config),
    });
  };
}

export default AxiosClient;
