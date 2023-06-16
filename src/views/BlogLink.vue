<template>
  <v-row justify="center">
    <v-col
      v-for="(item, i) in items"
      :key="i"
      :cols="col"
    >
      <v-card
        :color="item.color"
        :href="item.href"
        target="_blank"
        rounded="xl"
        class="elevation-2 "
        dark
      >
        <div class="d-flex justify-space-between">
          <div>
            <v-card-title
              class="text-h5"
              v-text="item.title"
            ></v-card-title>

            <v-card-subtitle v-text="item.artist"></v-card-subtitle>
          </div>

          <v-avatar
            class="ma-3"
            :size="size"
            rounded="xl"
          >
            <v-img :src="item.avatar"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'BlogLink',

  computed: {
    size() {
      switch(this.$vuetify.breakpoint.name){
        case 'xs': return 48
        case 'sm': return 48
        case 'md': return 125
        case 'lg': return 125
        case 'xl': return 125
      }
    },
    col() {
      switch(this.$vuetify.breakpoint.name){
        case 'xs': return 12
        case 'sm': return 12
        case 'md': return 5
        case 'lg': return 5
        case 'xl': return 5
      }
    }
  },

  data: () => ({
    items: [
        {
          color: '#24292f',
          href: 'https://github.com/KegFmn',
          avatar: '/images/github.jpg',
          title: 'Github',
          artist: "Let's build from here, together.",
        },
        {
          color: '#fc5531',
          href: 'https://blog.csdn.net/weixin_47357245?spm=1000.2115.3001.5343',
          avatar: '/images/csdn.jpg',
          title: 'CSDN',
          artist: '专业开发者社区',
        },
      ],
  }),
  
  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>

</style>
