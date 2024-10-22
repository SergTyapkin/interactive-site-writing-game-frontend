<style lang="stylus" scoped>
@require '../styles/constants.styl'

.root
  display flex
  flex-direction column
  overflow-y auto

  .header
    --color colorBlocksBg
    display flex
    align-items center
    width 100%
    background var(--color)
    box-shadow 0 5px 20px var(--color)
    color textColor1
    padding 10px
    filter brightness(0.8)
    transition filter 0.2s ease
    cursor pointer
    &:hover
      filter brightness(1)
    .arrow-back
      transform rotate(180deg)
      width 60px
      height 60px
    .name-container
      white-space nowrap
      .name
        font-medium()
      .team-name
        font-small()

  .h1
    font-large()
    margin 20px
  .team
    flex 1
    display flex
    align-items center
    font-medium()
    color textColorDark4
    font-weight 600
    background var(--color)
    width 100%
    padding 20px
    cursor pointer
    transition all 0.2s ease
    text-transform capitalize
    filter brightness(0.8)
    .profile-img
      width 20px
      height 20px
      margin-left 20px
    &:hover
      color white
      filter brightness(1.2)
</style>

<template>
  <div class="root _app-flex-filler">
    <header class="header" @click="quit">
      <img class="arrow-back" src="../res/arrow_corner_right.svg" alt="back">
      <div class="name-container">
        <div class="name">{{ myName }}</div>
      </div>
    </header>

    <div class="h1">Выбор команды</div>
    <div v-for="team in teams" class="team" :style="{'--color': team.color}" @click="chooseTeam(team)">
      {{ team.name }}
      <span v-if="team.count !== undefined">
        <img src="../res/profile.svg" class="profile-img" alt="users">
        {{ team.count || 0 }}
      </span>
    </div>
  </div>
</template>

<script>
import {Milestones} from "~/utils/constants";

export default {
  data() {
    return {
      myName: undefined,
    }
  },

  mounted() {
  },

  methods: {
    chooseMilestone(milestone) {
      this.$ws.send('select_milestone', {
        userName: this.myName,
        teamId: team.id,
        teamName: team.name
      });
      this.$localStorage.saveSelectedTeam(team.id);
      this.$router.push({name: 'play'});
    },

    quit() {
      this.$localStorage.removeRole();
      this.$localStorage.removeUserName();
      this.$router.push({name: "chooseRole"});
    }
  }
}
</script>

