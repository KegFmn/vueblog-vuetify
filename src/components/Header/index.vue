<template>
  <v-card class="overflow-hidden">
    <!-- 头部组件 -->
    <v-app-bar
      app
      color="white"
      elevate-on-scroll
    >
      <!-- 抽屉按钮 //仅在小于md以下可见 -->
      <v-app-bar-nav-icon 
        @click="drawer = true"
        class="d-md-flex d-lg-none"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="mb-0 font-weight-black text-lg-h5 d-none d-lg-flex justify-end">Special Blog</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-responsive :max-width="searchWidth" height="40" v-on:keyup.enter="search">
        <v-menu offset-y rounded="xl" class="menu-search">
          <template v-slot:activator="{ on }">
            <v-text-field
              solo
              dense
              rounded
              clearable
              hide-details
              solo-inverted
              append-icon="mdi-magnify"
              v-model="keyword"
              class="input-search"
              autocomplete="off"
              v-on="on"
              ref="search"
              @click:append="search"
              @click:clear="clearKeyword"
            ></v-text-field>
          </template>
          <v-list v-show="items.length > 0" :max-width="searchWidth" rounded>
            <v-list-item v-for="(item, index) in items" :key="index" @click="itemClick(item)" two-line>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-responsive>

      <v-row class="d-none d-lg-flex justify-end">
        <v-btn 
          text 
          link
          rounded
          v-for="(item, index) in navigations" :key="index" :to="item.to" 
          v-show="item.name == '发表博客' ? hasLogin : true"
        >
          <v-icon left>
            {{item.icon}}
          </v-icon>
          {{item.name}}
        </v-btn>
      </v-row>

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
            class="mr-5 ml-5 d-none d-lg-flex"
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
                color="#43A047" 
                v-show="!hasLogin" 
                to="/login"
              >
                登录
              </v-btn>

              <v-divider class="my-3" v-show="hasLogin" ></v-divider>

              <v-btn
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
    </v-app-bar>

    <!-- 左边手机导航抽屉 -->
    <v-navigation-drawer
      app
      width="180"
      temporary
      v-model="drawer"
    >
      <!-- 头像 -->
      <v-list>
        <v-list-item class="d-flex justify-center">
          <v-list-item-avatar>
            <v-img :src="user.avatar"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-content class="py-0">
            <v-list-item-title class="text-h6 d-flex justify-center">
              {{user.userName}}
            </v-list-item-title>
            <v-list-item-subtitle class="d-flex justify-center">
              {{user.email}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- 网站监控 -->
      <v-list shaped disabled>
        <v-list-item-group
          color="primary"
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                访客
              </v-list-item-title>
            </v-list-item-content>

            <span class="font-weight-medium text-no-wrap">{{ monitor.visitTotal }}</span>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-thumb-up</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                点赞
              </v-list-item-title>
            </v-list-item-content>

            <span class="font-weight-medium text-no-wrap">{{ monitor.likeTotal }}</span>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-post-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                博客
              </v-list-item-title>
            </v-list-item-content>

            <span class="font-weight-medium text-no-wrap">{{ monitor.blogTotal }}</span>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-bulletin-board</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                留言
              </v-list-item-title>
            </v-list-item-content>

            <span class="font-weight-medium text-no-wrap">{{ monitor.blessTotal }}</span>
          </v-list-item>
        </v-list-item-group>

      </v-list>

      <v-divider></v-divider>

      <!-- 手机导航 -->
      <v-list shaped>
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            link
            v-for="(item, index) in navigations"
            :key="index"
            :to="item.to"
            v-show="item.name == '发表博客' ? hasLogin : true"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            link
            block
            color="#43A047" 
            v-show="!hasLogin" 
            to="/login"
          >
            登录
          </v-btn>

          <v-btn
            block
            v-show="hasLogin"
            color="#EF5350" 
            @click="logout"
          >
            退出
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  computed: {
    monitor() {
      return this.$store.getters.getMonitor
    },
    searchWidth() {
      switch(this.$vuetify.breakpoint.name){
        case 'xs': return 200
        case 'sm': return 400
        case 'md': return 600
        case 'lg': return 600
      }
    }
  },
  watch: {
    keyword: 'inputHandle'
  },
  data: () => ({
    user:{
      userName: '请先登录',
      avatar: '/images/default-avatar.png',
      email:''
    },
    navigations: [
      {to: '/', icon: 'mdi-home-variant', name: '主页'},
      {to: '/blogLink', icon: 'mdi-link-variant-plus', name: '友链'},
      {to: '/blogGuest', icon: 'mdi-calendar-text', name: '留言板'},
      {to: '/blog/add', icon: 'mdi-pencil', name: '发表博客'},
    ],
    hasLogin: false,
    drawer: false,
    showSelect: true,
    keyword: '',
    items: [],
    currentPage: 1,
    pageSize: 5
  }),
  methods: {
    logout() {
      this.$store.commit("REMOVE_INFO")
      this.$router.push("/login")
    },
    itemClick (item) {
      this.$refs.search.blur()
      this.$router.push({name:'BlogDetail',params: {blogId: item.id}})
    },
    inputHandle (keyword) {
      if (keyword != undefined && keyword.trim() !== '') {
        this.showSelect = true
        setTimeout(() => {
          this.getEntity()
        }, 250)
      }
    },
    getEntity () {
      const params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        q: this.keyword
      }
      this.$axios.get('/search', {params} ).then(res =>{
        this.items = res.data.data.content
        console.log(this.items);
      })
    },
    search () {
      this.$refs.search.blur()
      if(this.keyword != undefined && this.keyword != ''){
        this.$router.push({name:'Search',params: {keyword: this.keyword}})
      } else{
        this.$router.push("/")
      }
    },
    clearKeyword () {
      this.items = []
      this.keyword = ''
    }
  },
  mounted() {
    if(this.$store.getters.getUser){
      this.user.userName = this.$store.getters.getUser.userName
      this.user.avatar = this.$store.getters.getUser.avatar
      this.user.email = this.$store.getters.getUser.email
      this.hasLogin = true
    }

  }
}
</script>

<style lang="scss" scoped>
  .v-application--is-ltr .v-list-item__avatar:first-child{
    margin-right: 0px;
  }
  .menu-search{
    width: 10px;
  }
</style>
