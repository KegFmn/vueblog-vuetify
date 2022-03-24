<template>
  <v-main class="grey lighten-3">
    <v-row justify="center" align="center" :style="{'height': height + 'px'}">
      <v-sheet 
        outlined
        rounded="xl"
        elevation="10"
        :min-width="$vuetify.breakpoint.xl ? 500 : '45vh'"
        class="pa-6"
      >
        <v-col>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="ruleForm.userName"
              :rules="rules.nameRules"
              label="账号"
              required
              validate-on-blur
            ></v-text-field>

            <v-text-field
              v-model="ruleForm.passWord"
              :rules="rules.pwdRules"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              label="密码"
              required
              validate-on-blur
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn
              color="success"
              class="mr-4 mt-1"
              @click="submitFrom"
            >
              登录
            </v-btn>

            <v-btn
              color="error"
              class="mt-1"
              @click="reset"
            >
              重置
            </v-btn>

          </v-form>
        </v-col>
      </v-sheet>
    </v-row>
  </v-main>
</template>

<script>
  export default {
    data: () => ({
      show1: false,
      height: 0,
      valid: true,
      ruleForm: {
        userName: '',
        passWord: ''
      },
      rules: {
        nameRules: [
          v => !!v || '名字不为空',
          v => (v && (v.length >=2 && v.length <= 15)) || '账号长度2~15之间',
        ],
        pwdRules: [
          v => !!v || '密码不为空',
        ]
      }
    }),
    methods: {
      submitFrom () {
        if(this.$refs.form.validate()){
          this.$axios.post('/login',this.ruleForm).then(res =>{
            const jwt = res.headers['authorization']
            const userInfo = res.data.data

            //vuex同步提交
            this.$store.commit('SET_TOKEN', jwt)
            this.$store.commit('SET_USERINFO', userInfo)

            //vuex获取
            // console.log(this.$store.getters.getUser);

            //路由跳转
            this.$router.push("/")
          })
        } else {
          console.log('error submit!!');
          return false
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      keyDown(e){
        //如果是回车则执行登录方法
        if(e.keyCode == 13){
          this.submitFrom();
        }
      }
    },
    mounted(){
      this.height = window.innerHeight;
      window.addEventListener('keydown',this.keyDown)
    },
    beforeDestroy () {
      window.removeEventListener('keydown', this.keyDown, false);
    }
  }
</script>

<style lang="scss" scoped>

</style>