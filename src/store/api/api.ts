import axios from "axios";
import Vue from "vue";
import { Action } from "@/store/api/actionType";
import { eventHub } from "@/utils/eventHub";
import JWTStore from "@/store/modules/jwt";
import router from "@/router";
import logOut from '@/store/modules/jwt'

const actionBase = axios.create({
  baseURL: Action.Base + Action.API,
});

// const actionBase = axios.create({
//   baseURL: Action.API,
// });

// Make Axios play nice with Django CSRF
actionBase.defaults.xsrfCookieName = "csrftoken";
actionBase.defaults.xsrfHeaderName = "X-CSRFToken";

// actionBase.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");

// actionBase.interceptors.response.use(
//   function(response) {
//     return response;
//   },
//   async function(error) {
//     if (error.response.status === 401) {
//       if (error.response.data.code === "token_not_valid" && (error.response.data.detail === "Token is invalid or expired" || error.response.data.detail === "Token 'exp' claim has expired")) {
//         JWTStore.logOut();
//       } else if (error.response.data.code === "token_not_valid" && error.response.data.messages[0]["token_class"] === "AccessToken") {
//         const tok = await JWTStore.getAccessToken();
//         return new Promise((resolve) => {
//           error.response.config.headers.Authorization = "Bearer " + localStorage.getItem("access_token");
//           resolve(axios(error.response.config));
//         });
//       }
//     }

//     return Promise.reject(error);
//   }
// );

const vm = new Vue();

export function setJWT() {
    if (localStorage.getItem("access_token")) {
      actionBase.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");
    } 
  
}

function notifyError(err: any) {
  if (err.response.status === 401) {
    const detail = err.response.data.detail;
    if (detail != null || detail != undefined) {
    //   vm.$notify.error(detail);
      eventHub.$emit('notify','ERROR', detail, 'danger')
    }
  } else if (err.response.status == 403) {
    const detail = err.response.data.detail;
    if (detail != null || detail != undefined) {
    //   vm.$notify.error(detail);
      eventHub.$emit('notify', 'ERROR', detail, 'danger')

    }
  } else {
    // vm.$notify.error(err.response.data);
    eventHub.$emit('notify','ERROR', err.response.data, 'danger')
  }
}

function handleError(err: any) {
  if (err.response.status == 401 && err.response.data.code == "token_not_valid") {
      JWTStore.logOut()
      console.log(err)
  }
}

export function clearJWT() {
  delete actionBase.defaults.headers.common["Authorization"];
}

export async function postApi(action: string, param: any, extra?: any, query_params = ""): Promise<any> {
  // eventHub.$emit("before-request");
  return await new Promise((resolve, reject) => {
    setJWT();
    const promise = actionBase.post(`/${action}/${query_params}`, param, extra);
    promise.then((res) => {
      // eventHub.$emit("after-response");
      console.log('rd', res.data);
      resolve(res.data);
    });

    // For error with status code 400 Bad Request
    promise.catch((err) => {
      // eventHub.$emit("after-response");
      if (err.response) {
        console.log(err.response);
        console.log(err.response.data);

        notifyError(err);
        handleError(err);
        reject(err);
      }
      // reject(err);
    });
  });
}

export async function putApi(action: string, param: any, extra?: any, query_params = ""): Promise<any> {
  // eventHub.$emit("before-request");
  return await new Promise((resolve, reject) => {
    setJWT();

    const promise = actionBase.put(`/${action}/${query_params}`, param, extra);
    promise.then((res) => {
      // eventHub.$emit("after-response");
      console.log(res.data);
      resolve(res.data);
    });

    // For error with status code 400 Bad Request
    promise.catch((err) => {
      // eventHub.$emit("after-response");
      if (err.response) {
        console.log(err.response);
        console.log(err.response.data);

        notifyError(err);
        handleError(err);
        reject(err);
      }
    });
  });
}

export async function patchApi(action: string, param: any, extra?: any, query_params = ""): Promise<any> {
  // eventHub.$emit("before-request");
  return await new Promise((resolve, reject) => {
    setJWT();

    const promise = actionBase.patch(`/${action}/${query_params}`, param, extra);
    promise.then((res) => {
      // eventHub.$emit("after-response");
      console.log(res.data);
      resolve(res.data);
    });

    // For error with status code 400 Bad Request
    promise.catch((err) => {
      // eventHub.$emit("after-response");
      if (err.response) {
        console.log(err.response);
        console.log(err.response.data);

        notifyError(err);
        handleError(err);
        reject(err);
      }
    });
  });
}

export async function getApi(action: string, params = ""): Promise<any> {
  return await new Promise((resolve, reject) => {
    setJWT();
    // if (action === "crops" || action === "cropcategorynavbar") {
    //   clearJWT();
    // } else {
    // }
    eventHub.$emit("before-request");
    console.log('action',action, params)
    const promise = actionBase.get(`/${action}/${params}`);
    promise.then((res) => {
      eventHub.$emit("after-response");
      console.log(res.data);
      resolve(res.data);
    });

    promise.catch((err) => {
      eventHub.$emit("after-response");
      console.log(err.response);
      console.log(err.response.data);

      notifyError(err);
      handleError(err);
    });
  });
}

export async function deleteApi(action: string, param: any): Promise<any> {
  eventHub.$emit("before-request");
  return await new Promise((resolve, reject) => {
    actionBase.delete(`/${action}/${param}/`).then(
      (res) => {
        eventHub.$emit("after-response");
        resolve(res.data);
      },
      (err) => {
        eventHub.$emit("after-response");
        if (err.response) {
          if (err.response.data.Message) {
            // vm.$notify.error(err.response.data.Message);
            eventHub.$emit('notify', 'Error', err.response.data.Message, 'danger')

          }
          if (err.response.data.message) {
            // vm.$notify.error(err.response.data.message);
            eventHub.$emit('notify', 'Error', err.response.data.message, 'danger')

        }
        } else {
        //   vm.$notify.error("Network Error");
            eventHub.$emit('notify', "Network Error", "", 'danger')

        }
      }
    );
  });
}
