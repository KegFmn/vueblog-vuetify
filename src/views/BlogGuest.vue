<template>
  <v-row>
    <v-col class="gitalk-col" cols="24">
      <Gitalk class="gitalk"/>
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
.gitalk-col{
  padding: 12px 24px 12px 24px;
  .gitalk{
    .gitalk-container{
      .gt-container{
        .gt-meta{
          margin-top: 0px;
        }
      }
    }
  }
}
</style>
