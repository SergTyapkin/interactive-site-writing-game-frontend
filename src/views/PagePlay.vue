<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/buttons.styl'

.root-play
  display flex
  flex-direction column
  .header-container
    text-align center
    padding 0 20px
    margin-bottom 10px
    cursor pointer
    .header
      font-large()
    .task-name
      font-large()
      font-bold()
    .description
      font-small()
      color colorText4

  .main
    flex 1
    display flex
    .ace-editor
      border-radius borderRadiusL borderRadiusL 0 0
      flex 1
</style>

<template>
  <div class="root-play">
    <div class="header-container" @click="showDescription">
      <header class="header">Реализуйте вашу часть:</header>
      <header class="task-name">{{ fragment?.name }} #{{ fragment?.id }}</header>
      <div class="description">Нажмите, чтбы увидеть описание</div>
    </div>

    <main class="main">
      <VAceEditor
        class="ace-editor"
        v-model:value="codeText"
        :lang="milestoneData?.codeLanguage"
        theme="monokai"
        placeholder="Enter your code here"
        :options="{
          useWorker: true,
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true,
          fontSize: 18,
        }"
      ></VAceEditor>
    </main>
  </div>
</template>

<script>
import {VAceEditor} from 'vue3-ace-editor';
import './ace-config';
import validateModel from "@sergtyapkin/models-validator";
import {FragmentModel} from "~/models";


export default {
  components: {VAceEditor},

  data() {
    return {
      codeText: '',

      fragment: {},
      milestoneData: {},

      sendingInterval: undefined,
      hasNewChanges: false,
      isSkip1Watch: false,
      isSkip1FragmentUpdated: false,
    }
  },

  mounted() {
    const fragmentData = this.$localStorage.loadSelectedFragment();
    console.log(fragmentData)
    if (!fragmentData) {
      // this.$popups.error("Ошибка", "Данные выбранного фрагмента не найдены");
      this.$router.push({name: "chooseMilestone"});
      return;
    }
    this.fragment = validateModel(FragmentModel, fragmentData);
    const allMilestones = this.$localStorage.loadAllMilestones();
    this.milestoneData = allMilestones.find(milestone => String(milestone.id) === String(this.fragment.milestoneId));

    this.codeText = this.fragment.text;

    this.sendingInterval = setInterval(this.sendTextUpdate, 2000);

    this.$ws.handlers.fragment_updated = (data) => {
      // console.log("EVENT", this.isSkip1FragmentUpdated);
      const fragment = validateModel(FragmentModel, data);
      if (
        (String(fragment.milestoneId) !== String(this.fragment.milestoneId)) ||
        (String(fragment.id) !== String(this.fragment.id))
      ) {
        return;
      }
      if (this.isSkip1FragmentUpdated) {
        this.isSkip1FragmentUpdated = false;
        return;
      }
      this.$localStorage.saveSelectedFragment(data);
      this.fragment = fragment;
      this.codeText = this.fragment.text;
      this.isSkip1Watch = true;
      // console.log("SET WATCH");
    }
  },

  unmounted() {
    clearInterval(this.sendingInterval);
  },

  methods: {
    sendTextUpdate() {
      if (!this.hasNewChanges) {
        return;
      }
      this.$ws.send('update_fragment_text', {
        milestone_id: this.fragment.milestoneId,
        fragment_id: this.fragment.id,
        fragment_text: this.codeText,
      });
      this.isSkip1FragmentUpdated = true;
      // console.log("SET EVENT");
      this.hasNewChanges = false;
    },

    showDescription() {
      this.$modal.alert("Ваша задача:", this.fragment.description);
    }
  },

  watch: {
    codeText(to) {
      // console.log("WATCH", this.isSkip1Watch);
      if (this.isSkip1Watch) {
        this.isSkip1Watch = false;
        return;
      }
      let fragmentData = this.$localStorage.loadSelectedFragment();
      if (!fragmentData) {
        console.error("CRITICAL ERROR. FRAGMENT NOT EXISTS");
        return;
      }
      fragmentData = JSON.parse(fragmentData);
      fragmentData.text = to;
      this.$localStorage.saveSelectedFragment(fragmentData);
      this.hasNewChanges = true;
    }
  }
}
</script>

