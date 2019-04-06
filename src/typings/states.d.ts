declare module "axios-redux-types" {
  import { AxiosResponse, AxiosError } from "axios";
  export interface IPayloadObject {
    loading: boolean;
    success: boolean | AxiosResponse;
    error: boolean | AxiosError;
  }
}
