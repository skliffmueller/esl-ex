import axiosMiddlewareCreator, { ISuffixTypes } from "redux-axios-middleware";
import axios, {AxiosInstance} from "axios";

const client: AxiosInstance = axios.create({
  baseURL: "https://api.eslgaming.com/play/",
});

export const suffixTypes: ISuffixTypes = {
  successSuffix: "_SUCCESS",
  errorSuffix: "_FAILURE",
};

export const axiosMiddleware = axiosMiddlewareCreator(client, suffixTypes);

export default axiosMiddleware;
