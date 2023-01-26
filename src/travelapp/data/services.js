import axios from "axios";
import { baseURL } from "./data";
export const API_URL = baseURL;

class AuthService {
  login(data) {
    console.log(data);
    return axios.postForm(API_URL + "/auth/login/", data);
  }

  addPackage(data) {
    // axios.defaults.headers.common = null;
          // console.log(JSON.stringify(axios.defaults.headers.common))
    return axios.post(API_URL + "/api/packageadmin/",data,{
         headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getPackage(){
    return axios.get(API_URL+"/api/packageadmin/");
  }

  putPackage(data){
    return axios.put(API_URL+"/api/packageadmin/",data,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    });
  }

  putPackageDescription(data){
     return axios.put(API_URL+"/api/packagedescription/",data,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    });
  }


  deletePackage(data){
   
    return axios.delete(API_URL+"/api/packageadmin/",{
      params:data
    });
  }

  admin() {
    axios.get(API_URL + "/login").then((res) => console.log(res));
  }

  logout() {
    localStorage.removeItem("user_token");
  }

  register(data) {
    return axios.post(API_URL + "/auth/register/", data);
  }

  getCurrentUserToken() {
    return localStorage.getItem("user_token");
  }
}

export default new AuthService();
