<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/fonts.styl'
@require '../styles/animations.styl'

.root-header
  position absolute
  z-index 1
  top 0
  width 100%
  height headerHeight
  background mix(#333, transparent, 50%)
  backdrop-filter blur(20px)
  border-radius 0 0 borderRadiusL borderRadiusL
  display flex
  align-items center
  justify-content space-between
  padding 0 20px
  .username-block
    display flex
    align-items center
    font-large()
    .id
      margin-left 15px
      color colorText5
    .username
      margin-left 15px
    .logout
      display block
      width 25px
      heigth 25px
      transform rotate(180deg)
      padding-top 5px
      hover-effect()
  .isAdmin
    font-large()
    color colorEmp1
</style>

<template>
  <header class="root-header">
    <div class="username-block">
      <img class="logout" @click="logout" src="../../res/icons/exit_to_app.svg" alt="logout">
      <div v-if="!$store.state.user.isAdmin" class="username">{{ $store.state.user.username }}</div>
      <div class="id">#ID {{ $store.state.user.id }}</div>
    </div>
    <router-link :to="{name: 'admin'}" v-if="$store.state.user.isAdmin" class="isAdmin">ADMIN</router-link>
  </header>
</template>

<script>
export default {
  props: {
  },

  data() {
    return {
    }
  },

  methods: {
    async logout() {
      if (!await this.$modal.confirm("Вы уверены, что хотите выйти из аккаунта?", "Все данные этого аккаунта будут потеряны")) {
        return;
      }

      this.$ws.send('logout_user', {id: this.$user.id, username: this.$user.username});
      this.$store.dispatch('DELETE_USER', this.$localStorage);
      this.$localStorage.removeSelectedFragment();
      this.$localStorage.removeAllMilestones();
      await this.$app.loginUser();
      this.$router.push({name: 'chooseMilestone'});
    }
  }
};
</script>
