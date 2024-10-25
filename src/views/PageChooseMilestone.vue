<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/utils.styl'
@require '../styles/fonts.styl'
@require '../styles/animations.styl'

.root-milestones
  display flex
  flex-direction column
  align-items center
  padding-left 20px
  padding-right 20px
  padding-bottom 30px
  > *
    max-width 500px
  .header
    font-large-extra()
    margin-bottom 60px
  .milestones-list
    list-no-styles()
    display flex
    flex-direction column
    gap 70px
    .milestone-container
      position relative
      &:nth-child(2n)
        .number
          right 0
        .milestone
          .top-string
            .year
              color colorText3
      .number
        position absolute
        z-index -1
        font-size 280px
        top -100px
        color colorText1
      .milestone
        border 1px solid #66666660
        border-radius borderRadiusS
        padding 20px
        backdrop-filter blur(8px)
        background mix(#333, transparent)
        position relative
        min-height 150px
        trans()
        cursor pointer
        .top-string
          display flex
          justify-content space-between
          align-items flex-start
          margin-bottom 10px
          .name
            font-large-extra()
            font-bold()
            color colorEmp1
            trans(0.5s)
          .year
            color colorText4
            font-small()
        .description
          color colorText1

        &:hover
          background mix(#555, transparent, 60%)
          border-color transparent
          .top-string
            .name
              letter-spacing 4px
</style>

<template>
  <div class="root-milestones">
    <header class="header">Выбор этапа</header>

    <ul class="milestones-list">
      <li v-for="milestone in allMilestones" class="milestone-container">
        <header class="number">{{ milestone.id }}</header>
        <div @click="chooseMilestone(milestone)" class="milestone">
          <div class="top-string">
            <header class="name">{{ milestone.name }}</header>
            <div class="year">год {{ milestone.year }}</div>
          </div>
          <div class="description">{{ milestone.description }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import CircleLoading from "~/App.vue";

export default {
  components: {CircleLoading},
  data() {
    return {
      myName: undefined,

      loading: false,

      allMilestones: [],
    }
  },

  mounted() {
    this.getAllMilestones();
  },

  methods: {
    async chooseMilestone(milestone) {
      if (!await this.$modal.confirm(`Вы точно хотите выбрать этап "${milestone.name}"?`)) {
        return;
      }
      const userWantsToGetHarder = await this.$modal.confirm("Вы хотели бы получить часть кода посложнее?");
      this.$ws.send('take_fragment', {
        user_id: this.$user.id,
        user_username: this.$user.username,
        milestone_id: milestone.id,
        request_hardness: userWantsToGetHarder ? 1.0 : 0.0,
      });

      this.$ws.handlers.set_fragment = (data) => {
        this.$localStorage.saveSelectedFragment(data);
        this.$router.push({name: 'play'});
      }
    },

    getAllMilestones() {
      this.$ws.send('get_all_milestones', {});

      this.$ws.handlers.all_milestones = (data) => {
        this.$localStorage.saveAllMilestones(data.milestones);
        this.allMilestones = this.$localStorage.loadAllMilestones();
      };
    }
  }
}
</script>

