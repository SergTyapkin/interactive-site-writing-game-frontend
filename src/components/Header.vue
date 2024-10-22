<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/fonts.styl'

.root-header
  position absolute
  top 0
  width 100%
  height headerHeight
  background mix(#333, transparent, 50%)
  backdrop-filter blur(20px)
  border-radius 0 0 10px 10px
  display flex
  align-items center
  justify-content space-between
  padding 0 60px
  .username
    font-large()
    .id
      margin-left 20px
      color colorText5
  .isAdmin
    font-large()
    color colorEmp1
</style>

<template>
  <header class="root-header">
    <div class="username">{{ user?.username }} <span class="id">#ID {{ user?.id }}</span></div>
    <div v-if="user?.isAdmin" class="isAdmin">ADMIN</div>
  </header>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
    }
  },
};
</script>
