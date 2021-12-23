import axiosClient from "./axiosClient";

const feeshipAPI = {
  getAll: (token) => {
    const url = '/feeship/getall';
    return axiosClient.get(url, {
      headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
    });
  },

  payFeeByDelivery: (item, token) => {
    const url = '/feeship/payfeemanagerbydelivery';
    return axiosClient.post(url, item, {
      headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
    });
  },

  payCOD: (item, token) => {
    const url = '/feeship/payfeemanager';
    return axiosClient.post(url, item, {
      headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
    });
  },

  getConfig: (token) => {
    const url = '/feeship/getconfig';
    return axiosClient.get(url, {
      headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
    });
  },

  updateConfig: (item, token) => {
    const url = '/feeship/updateconfig';
    return axiosClient.post(url, item, {
      headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
    });
  },

}

export default feeshipAPI;