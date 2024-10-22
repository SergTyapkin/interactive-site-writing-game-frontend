<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/buttons.styl'

.root
  display flex
  flex-direction column
  .header
    font-large()
    margin 20px
  .buttons-container
    flex 1
    display flex
    gap 20px
    width 100%
    margin-bottom 40px
    justify-content space-evenly
    align-items center
    @media ({mobile})
      flex-direction column
    .button-player
    .button-seer
      button-green()
      width 300px
      height 300px
      display flex
      align-items center
      justify-content center
    .button-seer
      button-gray()
      padding 20px
</style>

<template>
  <div class="root _app-flex-filler">
    <div class="header">Выберите роль</div>
    <div class="buttons-container">
      <div class="button-player" @click="selectRole(roles.player)">Я буду играть</div>
      <div class="button-seer" @click="selectRole(roles.seer)">Я буду только наблюдать</div>
    </div>
  </div>
</template>

<script>
import {Roles} from "../utils/constants";


export default {
  data() {
    return {
      roles: Roles,
    }
  },

  mounted() {
  },

  methods: {
    async selectRole(role) {
      if (role === Roles.player) {
        const username = await this.$modal.prompt("Введите ваше имя");
        if (!username)
          return;
        this.$localStorage.saveUserName(username);
        this.$localStorage.saveRole(role);
        this.$router.push({name: 'chooseTeam'});
        return;
      }
      // seer
      this.$localStorage.saveRole(role);
      this.$router.push({name: 'seerPage'});
    }
  }
}
</script>

