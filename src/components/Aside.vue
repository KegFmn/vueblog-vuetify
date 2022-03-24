<template>
  <v-col :cols="offset" class="left-list-top d-none d-md-flex">
    <v-sheet rounded="xl" width="100%">
      <v-list color="transparent" rounded>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
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
    offset () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 0
        case 'sm': return 0
        case 'md': return 3
        case 'lg': return 3
        case 'xl': return 3
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
    this.list();
  }
}
</script>

<style lang="scss" scoped>
.left-list-top{
  position:fixed;
}
</style>