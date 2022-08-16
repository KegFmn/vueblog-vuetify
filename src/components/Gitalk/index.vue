<template>
  <div id="gitalk-container"></div>
</template>

<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
export default {
  name: 'Gitalk',

  data: () => ({
    config: {
      clientID: '68592b0f243bce80bb94',
      clientSecret: '878b0cadfcee2b957e8df28f1de7adf931cf28c4',
      repo: 'vueblog-vuetify',
      owner: 'KegFmn',
      admin: ['KegFmn'],
      id: location.pathname,      // Ensure uniqueness and length less than 50
      language:'zh-CN',
      distractionFreeMode: false  // Facebook-like distraction free mode
    }
  }),

  mounted() {
    this.initGitalk()
  },

  methods: {
    initGitalk() {
      const gitalk = new Gitalk(this.config)
      gitalk.render('gitalk-container')
    }
  },
};
</script>

<style lang="scss" scoped>

</style>