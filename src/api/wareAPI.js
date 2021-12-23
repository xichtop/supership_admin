import axiosClient from "./axiosClient";

const wareAPI = {
    getAll: (token) => {
        const url = '/ware/';
        return axiosClient.get(url, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    },
 
}

export default wareAPI;