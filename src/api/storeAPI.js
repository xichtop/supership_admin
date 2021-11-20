import axiosClient from "./axiosClient";

const storeAPI = {
    getAll: (token) => {
        const url = '/stores/';
        return axiosClient.get(url, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    },
    
    updateStatus: (item, token) => {
        const url = '/stores/updatestatus';
        return axiosClient.post(url, item, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    }
}

export default storeAPI;