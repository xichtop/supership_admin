import axiosClient from "./axiosClient";

const staffApi = {
  login: (user) => {
    const url = '/staffs/login';
    return axiosClient.post(url, user);
  },
}

export default staffApi;