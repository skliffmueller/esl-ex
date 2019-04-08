/*
 * Using axios middleware for convenience
 * An alternative method would be to bind onto the promise for each axios client request in the action
 * and dispatch separate actions for each loading, success, and failure states
 */
import axiosMiddlewareCreator, { ISuffixTypes } from "redux-axios-middleware";
import axios, {AxiosInstance} from "axios";

// Usually I'd make this a build argument or an environment variable
const client: AxiosInstance = axios.create({
  baseURL: "https://api.eslgaming.com/play/",
});

export const suffixTypes: ISuffixTypes = {
  successSuffix: "_SUCCESS",
  errorSuffix: "_FAILURE",
};

export const axiosMiddleware = axiosMiddlewareCreator(client, suffixTypes);

export default axiosMiddleware;
