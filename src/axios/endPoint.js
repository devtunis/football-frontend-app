

import axios from "axios"

import { RefreshTheToken } from "../RefreshToken/RefrshTokenL";
import socket from "../socketClient/socket";

const EndPointUrl = import.meta.env.VITE_URL

let  axiosClient = axios.create({
  baseURL: EndPointUrl,
  withCredentials:true

});



let failedRequests = []

let isRefreshing = false

let logoutButtonTitle = "Log-out"
let missingTokenErrorMessage = "Token missing"






const processQueue = (error = null) => {
  failedRequests.forEach((request) => {

    if (error) {
      request.reject(error);
    } else {
      axiosClient(request.conf)
        .then(request.resolve)
        .catch(request.reject);
    }

  });

  failedRequests = [];
};






axiosClient.interceptors.response.use(

  async(response) => {



    return response;
  },
  async (error) => {

    const origingalRequest = error.config






    let message  = error?.response.data.message


    if(message =="Invalid or expired token" && !origingalRequest._retry){
      origingalRequest._retry = true





        if(isRefreshing){
          return new Promise((resolve,reject)=>{
              failedRequests.push({
                  conf : origingalRequest ,
                  resolve,
                  reject
              })


          })
        }


        isRefreshing = true


        try{
          await RefreshTheToken()
          socket.disconnect().connect()
          processQueue()
          return axiosClient(origingalRequest)





        }
        catch(refreshError){
        processQueue(refreshError)
        throw Error("expired Refresh token")



        }



        finally{
          isRefreshing = false

        }



















    }


   if(message===logoutButtonTitle){

     await  axiosClient.post("/api/deleteCookies")
     location.href="/LoginAccount"
     throw Error("expired Refresh token")

    }

   if(message === missingTokenErrorMessage){
        await  axiosClient.post("/api/deleteCookies")
        location.href="/LoginAccount"
        throw Error("missing Token")



    }







    return Promise.reject(error);
  }
);

export default axiosClient;
