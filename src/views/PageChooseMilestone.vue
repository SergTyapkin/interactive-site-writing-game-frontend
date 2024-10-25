<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/utils.styl'
@require '../styles/fonts.styl'
@require '../styles/animations.styl'
@require '../styles/components.styl'

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
        block()
        padding 20px
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
        .button-opened
          button-no-styles()
          position absolute
          right 10px
          bottom 0
          opacity 0.5
          transform rotate(90deg)
          trans()
          img
            width 40px
            height 40px

        &:hover
          background mix(#555, transparent, 60%)
          border-color transparent
          .top-string
            .name
              letter-spacing 4px

      &.opened
        .milestone
          .button-opened
            transform rotate(-90deg)

      .to-taken-fragment-block
        block()
        padding 10px 20px
        margin 8px 0
        border 1px solid colorEmp1
        cursor pointer
        trans()
        &:hover
          background mix(#555, transparent, 60%)
        .title
          font-large()
          color colorText5
        .description
          font-large()
          display flex
          align-items center
          img
            width 30px
            hegiht 30px
      .fragments
        list-no-styles()
        padding 20px 0
        .fragment
          block()
          padding 10px 20px
          margin 8px 0
          border none
          cursor pointer
          trans()
          &:hover
            background mix(#555, transparent, 60%)
          .hardness
            color colorText5
            font-small()
            .number-text
              font-large-extra()
              margin-right 5px
          .name
            font-large()
            .id
              font-small-extra()
              color colorText5
</style>

<template>
  <div class="root-milestones">
    <header class="header">Выбор этапа</header>

    <ul class="milestones-list">
      <li v-for="milestone in allMilestones" class="milestone-container" :class="{opened: milestone._isElementOpened}">
        <header class="number">{{ milestone.id }}</header>
        <div @click="toggleOpeningMilestone(milestone)" class="milestone">
          <div class="top-string">
            <header class="name">{{ milestone.name }}</header>
            <div class="year">год {{ milestone.year }}</div>
          </div>
          <div class="description">{{ milestone.description }}</div>
          <button class="button-opened"><img src="../../res/icons/arrow_corner_right.svg" alt="arrow"></button>
        </div>

        <div v-if="milestone.hasTakenFragment" class="to-taken-fragment-block" @click="chooseFragment(milestone)">
          <div class="title">Ваш фрагмент</div>
          <div class="description"><img src="../../res/icons/arrow_right.svg" alt="arrow">Перейти</div>
        </div>

        <transition name="opacity">
          <ul v-if="milestone._isElementOpened" class="fragments">
            <li v-for="fragment in milestone.availableFragments" @click="chooseFragment(milestone, fragment)" class="fragment">
              <div class="hardness"><span class="number-text">{{ fragment.hardness * 10 }}</span> сложность</div>
              <div class="name">{{ fragment.name }} <span class="id">#{{ fragment.id }}</span></div>
            </li>
          </ul>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
import CircleLoading from "~/App.vue";
import validateModel from "@sergtyapkin/models-validator";
import {FragmentPreviewModel} from "~/models";

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

    this.$ws.handlers.available_fragments = (data) => {
      const milestone = this.allMilestones?.find(milestone => String(milestone.id) === String(data.milestone_id));
      if (!milestone) {
        return;
      }
      milestone.availableFragments =
        data.fragments
          .map(fragment => validateModel(FragmentPreviewModel, fragment))
          .sort((a, b) => b.hardness - a.hardness);
    };
  },

  methods: {
    toggleOpeningMilestone(milestone) {
      milestone._isElementOpened = !milestone._isElementOpened;
      if (!milestone.availableFragments) {
        this.$ws.send('get_all_available_fragments', {
          milestone_id: milestone.id,
        });
      }
    },

    async chooseFragment(milestone, fragment=undefined) {
      let fragmentId = -1;
      if (fragment) {
        if (milestone.hasTakenFragment) {
          const res = await this.$modal.confirm(`Перевыбирать задание нельзя. Закончите уже выбранное!`, 'Перейти к выбранному заданию?');
          if (res) {
            this.chooseFragment(milestone);
          }
          return;
        }
        if (!await this.$modal.confirm(`Вы точно хотите выбрать задание ${fragment.hardness * 10} сложности "${fragment.name}"?`)) {
          return;
        }
        fragmentId = fragment.id;
      }
      this.$ws.send('take_fragment', {
        user_id: this.$user.id,
        user_username: this.$user.username,
        milestone_id: milestone.id,
        request_fragment_id: fragmentId,
      });

      this.$ws.handlers.set_fragment = (data) => {
        this.$localStorage.saveSelectedFragment(data);
        this.$router.push({name: 'play'});
      }
    },

    getAllMilestones() {
      this.$ws.send('get_all_milestones', {
        user_id: this.$user.id,
        user_username: this.$user.username,
      });

      this.$ws.handlers.all_milestones = (data) => {
        this.$localStorage.saveAllMilestones(data.milestones);
        this.allMilestones = this.$localStorage.loadAllMilestones();
      };
    }
  }
}
</script>

