import axiosClient from "./axiosClient";

const shipperAPI = {
    getAll: (token) => {
        const url = '/shippers/';
        return axiosClient.get(url, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    },

    updateStatus: (item, token) => {
        const url = '/shippers/updatestatus';
        return axiosClient.post(url, item, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    }
}

export default shipperAPI;