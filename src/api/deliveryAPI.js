import axiosClient from "./axiosClient";

const deliveryAPI = {
    getAll: (token) => {
        const url = '/deliveries/';
        return axiosClient.get(url, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    },
}

export default deliveryAPI;