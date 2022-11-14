import { ApiClient } from "../utils/api_client";
import { Constants } from "../utils/constants";
const authentication = {
  async register(data) {
    const response = await ApiClient.post(Constants.API_ROUTES.REGISTER, data);
    if (response.status === Constants.STATUS_CODES.SUCCESS) {
      return { status: true };
    } else {
      return { status: false, error: response.data.error };
    }
  },
  async login(data) {
    const response = await ApiClient.post(Constants.API_ROUTES.LOGIN, data);
    if (response.status === Constants.STATUS_CODES.SUCCESS) {
      const current_time = new Date();
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('time_stamp',JSON.stringify(current_time));
      return { status: true };
    } else {
      return { status: false, error: response.data.error };
    }
  },
};
export default authentication;
