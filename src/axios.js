import axios from 'axios'
import store from './store'
import router from './router'
import Message from './components/Message/index.js'

// 开发
axios.defaults.baseURL= '/api'

// 远程
// axios.defaults.baseURL= 'http://192.168.31.30/api'

// 本地
// axios.defaults.baseURL= 'http://localhost:8081'

//前置拦截
axios.interceptors.request.use(config =>{
  if(localStorage.getItem("token")) {
    config.headers.Authorization = localStorage.getItem("token");
  }
  if(store.getters.getMurmur) {
    config.headers['fingerprint'] = store.getters.getMurmur
  }
  return config
})


//后置拦截
axios.interceptors.response.use(response =>{
  let res = response.data;

  if(res.code === 200){
    return response
  }else{
    Message.error(response.data.msg)
    return Promise.reject(response.data.msg)
  }
},error =>{
    if(error.response.data){
      error.message = error.response.data.msg
    }

    if(error.response.status === 401){
      setTimeout(()=>{
        store.commit("REMOVE_INFO")
        router.push("/login")
      }, 1000);
    }
    Message.error(error.message)
    return Promise.reject(error)
  }
)
