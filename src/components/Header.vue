<template>
  <section>
    <!-- 头部组件 -->
    <v-app-bar
      app
      color="white"
    >
      <!-- 抽屉按钮 //仅在小于md以下可见 -->
      <v-app-bar-nav-icon 
        @click="drawer = true"
        class="d-sm-flex d-md-none"
      ></v-app-bar-nav-icon>

      <!-- 头部内容 -->
      <v-container class="py-0 fill-height" fluid>

        <p class="mb-0 font-weight-black text-lg-h5">MyBlog</p>
        <v-spacer></v-spacer> 
        <v-spacer></v-spacer> 

        <!-- 搜索框 仅在大于md可见 -->
        <!-- <v-responsive max-width="500" class="d-none d-md-flex ">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive> -->

        <v-spacer></v-spacer> 

        <v-btn text link to="/" rounded :class="{ 'mr-5' : !hasLogin}">主页</v-btn>
        <v-btn text link rounded class="mr-5" v-if="hasLogin" to="/blog/add">发表博客</v-btn>

        <!-- 头像点击悬浮菜单 -->
        <v-menu
        min-width="165px"
        rounded="xl"
        offset-y
        nudge-right="300"
        nudge-bottom="20"
        >
          
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
              small
            >
              <v-avatar
                color="grey darken-1"
                size="32"  
              >
                <img :src="user.avatar" alt="Avatar">
              </v-avatar>
            </v-btn>
          </template>

          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar
                  color="brown"
                >
                  <img :src="user.avatar" alt="Avatar">
                </v-avatar>

                <h3 class="mt-2">{{ user.userName }}</h3>

                <p class="text-caption mt-1">
                  {{ user.email }}
                </p>

                <v-divider class="my-3" v-show="!hasLogin"></v-divider>
                <v-btn
                  link
                  rounded
                  type="button"
                  color="#43A047" 
                  v-show="!hasLogin" 
                  to="/login"
                >
                  登录
                </v-btn>

                <v-divider class="my-3" v-show="hasLogin" ></v-divider>
                <v-btn
                  type="button"
                  rounded 
                  v-show="hasLogin"
                  color="#EF5350" 
                  @click="logout"
                >
                  退出
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-container>
    </v-app-bar>

    <!-- 移动端导航抽屉 -->
    <v-navigation-drawer
      app
      width="206"
      temporary
      v-model="drawer"
    >
      <v-list shaped>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            link
            v-for="(type,index) in types"
            :key="index"
            :to="{name:'Type', params: {typeId: type.tid}}"
          >
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ type.typeName }}
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </section>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  data: () => ({
    user:{
      userName: '请先登录',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      email:''
    },
    hasLogin: false,
    drawer: false,
    group: null,
    types: [],
  }),
  methods: {
    logout() {
      this.$axios.get('/logout', {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res =>{
        this.$store.commit("REMOVE_INFO")
        this.$router.push("/login")
      })
    },
    list() {
      this.$axios.get('/types').then(res =>{
          this.types = res.data.data
      })
    }
  },
  mounted() {
    if(this.$store.getters.getUser){
      this.user.userName = this.$store.getters.getUser.userName
      this.user.avatar = this.$store.getters.getUser.avatar
      this.user.email = this.$store.getters.getUser.email
      this.hasLogin = true
    }
    this.list()
  }
}
</script>

<style lang="scss" scoped>

</style>