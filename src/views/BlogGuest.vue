<template>
  <v-row>
    <v-col class="gitalk" cols="24">
      <Gitalk/>
    </v-col>
  </v-row>
</template>

<script>
import Gitalk from '../components/Gitalk/index.vue'
export default {
  name: 'BlogGuest',
  components: { Gitalk },
  data: () => ({

  }),

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
.gitalk{
  padding: 12px 24px 12px 24px;
}
.gitalk-container{
  .gt-meta{
    margin-top: 0px;
  }
}

</style>
