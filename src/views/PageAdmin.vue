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

        transition transform 0.2s ease-out
        transform unquote('scale(min(calc(var(--max-height) / var(--total-height)), 1))')
        transform-origin 50% 0
</style>

<template>
  <div class="root-admin_">
    <Selector v-model="selectedMilestoneId" name="milestone" class="selector_" @update:modelValue="getAllTexts()">
      <option v-for="milestone in allMilestones" :value="milestone.id">{{ milestone.id }}. {{ milestone.name }}</option>
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
        <button type="submit" @click="reloadPage()">Reload</button>
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

      <div class="renderers-container_" ref="renderersContainer"
           :style="{'--total-height': isAdjustRendererSize ? totalRendererHeight : 0, '--max-height': maxRendererHeightToScreen}">
        <transition name="opacity" mode="out-in">
          <section v-if="selectedMilestone?.id === 1" class="renderer_ html_" v-html="codeText"></section>

          <section v-else-if="selectedMilestone?.id === 2" class="renderer_ css_">
            <HtmlTemplateForBlock2 only-anchor-links ref="renderer"></HtmlTemplateForBlock2>
          </section>

          <section v-else-if="selectedMilestone?.id === 3" class="renderer_ js_">
            <HtmlTemplateForBlock2 only-anchor-links styled ref="renderer"></HtmlTemplateForBlock2>
          </section>

          <section v-else-if="selectedMilestone?.id === 4" class="renderer_ js_spa_">
            <HtmlTemplateForBlock2 styled scripted ref="renderer"></HtmlTemplateForBlock2>
          </section>

          <section v-else-if="selectedMilestone?.id === 5" class="renderer_ vue_">
            <HtmlTemplateForBlock2 styled scripted-spa ref="renderer"></HtmlTemplateForBlock2>
          </section>
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import {VAceEditor} from "vue3-ace-editor";
import Selector from "~/components/Selector.vue";
import validateModel from "@sergtyapkin/models-validator";
import {FragmentModel, FragmentShortModel} from "~/models";
import HtmlTemplateForBlock2 from "~/components/HtmlTemplateForBlock2.vue";


export default {
  components: {HtmlTemplateForBlock2, Selector, VAceEditor},

  data() {
    return {
      selectedMilestoneId: null,

      allMilestones: [],
      allFragments: [],
      fontSize: 10,
      isAdjustRendererSize: false,

      codeText: '',
      prettyText: '',

      maxRendererHeightToScreen: 0,
      totalRendererHeight: 0,

      customStylesComponent: document.getElementById('custom-styles-component'),

    }
  },

  computed: {
    selectedMilestone() {
      return this.allMilestones.find(milestone => String(milestone.id) === String(this.selectedMilestoneId));
    },
  },

  mounted() {
    this.allMilestones = this.$localStorage.loadAllMilestones();
    this.maxRendererHeightToScreen = window.innerHeight - this.$refs.renderersContainer.getBoundingClientRect().top - 20;


    this.$ws.handlers.all_texts = (data) => {
      const fragments = data.fragments.map(fragment => validateModel(FragmentShortModel, fragment));
      fragments.sort((a, b) => Number(a.id) - Number(b.id));
      this.allFragments = fragments;
      this.updateCodeTexts();
    }


    this.$ws.handlers.fragment_updated = (data) => {
      const fragment = validateModel(FragmentModel, data);
      if (String(fragment.milestoneId) !== String(this.selectedMilestoneId)) {
        return;
      }
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

    async reloadPage() {
      this.getAllTexts();
      await this.reloadRenderer();
    },
    async reloadRenderer() {
      if (!this.$refs.renderer) {
        return;
      }
      this.$refs.renderer.reRender();
    },

    async updateCodeTexts() {
      if (this.selectedMilestone?.id === 3) {
        await this.reloadRenderer();
      }

      // Code text
      const codeText = this.allFragments.reduce(
        (acc, fragment) => {
          if (this.selectedMilestone.codeLanguage === 'javascript') {
            // Execute each code block
            try {
              eval(`(function() {${fragment.text}\n})();`);
              delete fragment.error;
            } catch (err) {
              // console.error(`Error while executing fragment id: ${fragment.id}, name: ${fragment.name}, username: ${fragment.userUsername}. Error: ${err}`);
              fragment.error = err;
            }
            return '';
          }
          return acc + fragment.text;
        },
        ''
      );
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
        (acc, fragment) =>
          acc +
          `${fragment.userId ? `${commentStrStart} ------[${fragment.name}]------ ${commentStrEnd}\n` : ''}` +
          `${commentStrStart} ------[${fragment.id}] ${fragment.userUsername} #${fragment.userId}------ ${commentStrEnd}\n` +
          `${fragment.text.trim()}\n` +
          `${this.selectedMilestone?.codeLanguage === 'javascript' ? `/** ${fragment.error ? fragment.error : 'SCRIPT IS OK!'} **/\n\n` : ''}`,
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

