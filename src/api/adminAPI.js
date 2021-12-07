import axiosClient from "./axiosClient";

const adminAPI = {
  statistic: (item, token) => {
    const url = '/admin/statistic';
    return axiosClient.post(url, item, {headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
        }   
    });
  },
}

export default adminAPI;