import axios from 'axios'
import store from './store'
import router from './router'
import Message from './components/Message/index.js'

axios.defaults.baseURL="http://101.33.227.28:8081"

//前置拦截
axios.interceptors.request.use(config =>{
  return config
})


//后置拦截
axios.interceptors.response.use(response =>{
  let res = response.data;

  console.log("===========");
  console.log('后置拦截',res);
  console.log("===========");

  if(res.code === 200){
    // Message.success('这是一条操作成功的消息')
    return response
  }else{
    Message.error('错了哦，这是一条错误的消息')
    return Promise.reject(response.data.msg)
  }
},
  error =>{
    console.log(error)
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