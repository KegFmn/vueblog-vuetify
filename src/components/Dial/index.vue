<template>
  <v-speed-dial
    v-model="fab"
    :top="top"
    :bottom="bottom"
    :right="right"
    :left="left"
    :direction="direction"
    :open-on-hover="hover"
    :transition="transition"
    class="d-md-flex d-lg-none"
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-bookmark-multiple
        </v-icon>
      </v-btn>
    </template>
    
    <v-btn
      link
      small
      rounded
      v-for="(type,index) in types" :key="index"
      :to="{name:'Type', params: {typeId: type.id}}"
    >
      {{ type.typeName }}
    </v-btn>

  </v-speed-dial>
</template>

<script>
export default {
  name: 'Dial',
  computed: {
    types() {
      return this.$store.getters.getBlogType
    }
  },
  data() {
    return {
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
.v-speed-dial {
  position: fixed;
}

.v-btn--floating {
  position: relative;
}
</style>