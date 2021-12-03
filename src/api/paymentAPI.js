import axiosClient from "./axiosClient";

const shipperAPI = {
    getAllCODStore: (token) => {
        const url = '/payments/getallcod';
        return axiosClient.get(url, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    },

    payCOD: (item, token) => {
        const url = '/payments/paycodmanager';
        return axiosClient.post(url, item, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    },

    payCODByDelivery: (item, token) => {
        const url = '/payments/paycodmanagerbydelivery';
        return axiosClient.post(url, item, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    }
}

export default shipperAPI;