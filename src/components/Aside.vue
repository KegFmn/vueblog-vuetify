<template>
  <v-col :cols="cols" :offset="offsets" class="left-list-top d-none d-md-flex">
    <v-sheet rounded="xl" width="100%">
      <v-list color="transparent" rounded>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            link
            v-for="(type,index) in types"
            :key="index"
            :to="{name:'Type', params: {typeId: type.id}}"
          >
            <v-list-item-icon>
              <v-icon>mdi-bookmark-multiple</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ type.typeName }}
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list-item-group>

      </v-list>
    </v-sheet>
  </v-col>
</template>

<script>
export default {
  name: 'Aside',
  data: () => ({
    types: []
  }),
  computed: {
    cols () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 0
        case 'sm': return 0
        case 'md': return 2
        case 'lg': return 2
        case 'xl': return 2
      }
    },
    offsets() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 0
        case 'sm': return 0
        case 'md': return 1
        case 'lg': return 1
        case 'xl': return 1
      }
    }
  },
  methods: {
    list(){
      this.$axios.get('/types').then(res =>{
        this.types = res.data.data
      })
    }
  },
  mounted() {
    if(this.$vuetify.breakpoint.name == 'md' || this.$vuetify.breakpoint.name == 'lg' || this.$vuetify.breakpoint.name == 'xl'){
      this.list()
    }
  }
}
</script>

<style lang="scss" scoped>
.left-list-top{
  position:fixed;
}
</style>