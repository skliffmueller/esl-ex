/*
 * This is just my approach to how I handle axios/redux actions in the reducer
 * The idea is loading toggles when the initial action is dispatched
 * On success the success field will contain the AxiosResponse object
 * On failure the error field will contain the AxiosError object
 * Otherwise everything is set to false
 */
declare module "axios-redux-types" {
  import { AxiosResponse, AxiosError } from "axios";
  export interface IPayloadObject {
    loading: boolean;
    success: boolean | AxiosResponse;
    error: boolean | AxiosError;
  }
}
