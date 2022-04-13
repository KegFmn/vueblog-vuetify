import axios from 'axios'
import store from './store'
import router from './router'
import Message from './components/Message/index.js'
// "http://101.33.227.28:8081"
axios.defaults.baseURL="http://localhost:8081"

//前置拦截
axios.interceptors.request.use(config =>{
  return config
})


//后置拦截
axios.interceptors.response.use(response =>{
  let res = response.data;

  if(res.code === 200){
    return response
  }else{
    Message.error('错了哦，这是一条错误的消息')
    return Promise.reject(response.data.msg)
  }
},
  error =>{
    if(error.response.data){
      error.message = error.response.data.msg
    }

    if(error.response.status === 401){
      store.commit("REMOVE_INFO")
      router.push("/login")
    }
    Message.error(error.message)
    return Promise.reject(error)
  }
)