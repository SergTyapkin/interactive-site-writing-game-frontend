<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'
@require '../styles/utils.styl'
@require '../styles/components.styl'

.root-admin_
  width 100%
  margin-top -20px
  padding-left 20px
  padding-right 20px
  padding-bottom 20px
  display flex
  flex-direction column
  gap 10px

  .selector_
    flex 0

  .input-groups-container_
    display flex
    flex-wrap wrap
    gap 20px
    .input-group_
      display flex
      align-items center
      gap 10px

      input
        input()
      button
        button()
        input()
        cursor pointer

  .main_
    flex 1
    display flex
    gap 5px

    .ace-editor_
      flex 1
      max-width 500px
      min-width 200px

    .renderers-container_
      flex 1
      display flex
      backdrop-filter blur(10px)
      background mix(#333, transparent, 30%)
      .renderer_
        flex 1
        background colorBg

        &.css_
        &.html_
        &.js_
          transition transform 0.2s ease-out
          transform unquote('scale(min(calc(var(--max-height) / var(--total-height)), 1))')
          transform-origin 50% 0
</style>

<template>
  <div class="root-admin_">
    <Selector v-model="selectedMilestoneId" name="milestone" class="selector_" @update:modelValue="getAllTexts()">
      <option v-for="milestone in Milestones" :value="milestone.id">{{ milestone.name }}</option>
    </Selector>

    <div class="input-groups-container_">
      <div class="input-group_">
        <label for="font-size">Font size:</label>
        <input id="font-size" v-model="fontSize" type="number">
      </div>
      <div class="input-group_">
        <label for="adjust-size">Adjust size:</label>
        <input id="adjust-size" v-model="isAdjustRendererSize" type="checkbox">
      </div>
      <div class="input-group_">
        <button type="submit" @click="updateCodeTexts">Reload</button>
      </div>
    </div>

    <main class="main_">
      <VAceEditor
        class="ace-editor_"
        v-model:value="prettyText"
        :lang="selectedMilestone?.codeLanguage"
        theme="monokai"
        placeholder="Enter your code here"
        :options="{
            useWorker: true,
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            fontSize: fontSize,
          }"
        readonly
      ></VAceEditor>

      <div class="renderers-container_" ref="renderersContainer" :style="{'--total-height': isAdjustRendererSize ? totalRendererHeight : 0, '--max-height': maxRendererHeightToScreen}">
        <section v-if="selectedMilestone?.id === 1" class="renderer_ html_" v-html="codeText"></section>

        <section v-else-if="selectedMilestone?.id === 2" class="renderer_ css_">
          <HtmlTemplateForBlock2></HtmlTemplateForBlock2>
        </section>

        <section v-else-if="selectedMilestone?.id === 3" class="renderer_ js_">
          <HtmlTemplateForBlock2 styled></HtmlTemplateForBlock2>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import {VAceEditor} from "vue3-ace-editor";
import Selector from "~/components/Selector.vue";
import {Milestones} from "~/utils/constants";
import validateModel from "@sergtyapkin/models-validator";
import {FragmentModel, FragmentShortModel} from "~/models";
import HtmlTemplateForBlock2 from "~/components/HtmlTemplateForBlock2.vue";

export default {
  components: {HtmlTemplateForBlock2, Selector, VAceEditor},

  data() {
    return {
      selectedMilestoneId: null,

      allFragments: [],
      fontSize: 10,
      isAdjustRendererSize: true,

      codeText: '',
      prettyText: '',

      maxRendererHeightToScreen: 0,
      totalRendererHeight: 0,

      customStylesComponent: document.getElementById('custom-styles-component'),

      Milestones,
    }
  },

  computed: {
    selectedMilestone() {
      return Milestones.find(milestone => String(milestone.id) === String(this.selectedMilestoneId));
    },
  },

  mounted() {
    this.maxRendererHeightToScreen = window.innerHeight - this.$refs.renderersContainer.getBoundingClientRect().top - 20;


    this.$ws.handlers.all_texts = (data) => {
      const fragments = data.fragments.map(fragment => validateModel(FragmentShortModel, fragment));
      fragments.sort((a, b) => Number(a.id) - Number(b.id));
      this.allFragments = fragments;
      this.updateCodeTexts();
    }


    this.$ws.handlers.fragment_updated = (data) => {
      const fragment = validateModel(FragmentModel, data);
      const existingFragment = this.allFragments.find(frag => frag.id === fragment.id);
      if (!existingFragment) {
        console.error("CRITICAL ERROR. FRAGMENT NOT FOUND IN UPDATING");
        return;
      }
      existingFragment.text = fragment.text;
      existingFragment.userId = fragment.userId;
      existingFragment.userUsername = fragment.userUsername;
      this.updateCodeTexts();
    }
  },

  methods: {
    getAllTexts() {
      this.$ws.send('get_all_texts', {
        milestone_id: this.selectedMilestoneId,
      });
    },

    updateCodeTexts() {
      // Code text
      const codeText = this.allFragments.reduce((acc, cur) => acc + cur.text, '');
      this.codeText = codeText;
      if (this.selectedMilestone?.id === 2) {
        this.customStylesComponent.innerHTML = codeText;
      }

      // Pretty text
      let commentStrStart = '';
      let commentStrEnd = '';
      if (this.selectedMilestone?.codeLanguage === 'html') {
        commentStrStart = '<!--'
        commentStrEnd = '-->'
      } else if (this.selectedMilestone?.codeLanguage === 'css') {
        commentStrStart = '/**'
        commentStrEnd = '**/'
      } else if (this.selectedMilestone?.codeLanguage === 'javascript') {
        commentStrStart = '//'
        commentStrEnd = ''
      }
      this.prettyText = this.allFragments.reduce(
        (acc, cur) =>
          acc +
          `${commentStrStart} ------[${cur.id}] ${cur.userUsername} #${cur.userId}------ ${commentStrEnd}
${cur.text.trim()}
`,
        ''
      );

      // Update renderer height
      setTimeout(() => {
        this.totalRendererHeight = this.$refs.renderersContainer.scrollHeight;
      }, 100);
    },
  },
}
</script>

