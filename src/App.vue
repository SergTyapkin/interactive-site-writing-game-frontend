<style lang="stylus" scoped>
@import 'styles/constants.styl'
@import 'styles/buttons.styl'
@import 'styles/fonts.styl'

.wrapper
  width 100%
  min-height 100vh

  > *
    position absolute
    width 100%
    min-height 100vh
    padding-top (headerHeight + 30px)

  .loading
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 100px
    height 100px
    min-height unset


animation-time-rule = cubic-bezier(0.29, 0.82, 0.36, 0.99)
.background
  z-index -1
  position fixed
  inset 0
  overflow hidden
  div
    opacity 0.3
    width 100%
    position absolute
    border solid 1px mix(colorBorder, transparent, 40%)
    background #202020
    border-radius 20px
    animation bg-move-top animation-time-rule
    @keyframes bg-move-top
      0%
        opacity 0
        top 0
        height 200%
        width 200%
      20%
        top 0
        height 200%
        width 200%
  div:nth-child(2n)
    animation bg-move-bottom animation-time-rule
    @keyframes bg-move-bottom
      0%
        opacity 0
        top 100%
        height 200%
        width 200%
      20%
        top 100%
        height 200%
        width 200%

  div:nth-child(4)
    animation bg-move-top-scale animation-time-rule
    @keyframes bg-move-top-scale
      0%
        opacity 0
        top 100%
        height 0%
        width 200%
      20%
        top 0%
        height 0%
        width 200%
  div:nth-child(1)
    top 50%
    left 50%
    height 100%
    width 100%
    transform rotate(70deg)
    animation-duration 0.3s
  div:nth-child(2)
    top 0%
    left 20%
    height 200%
    width 100%
    transform rotate(40deg)
    animation-duration 1.2s
  div:nth-child(3)
    top -40%
    left -50%
    height 100%
    width 100%
    transform rotate(20deg)
    animation-duration 0.6s
  div:nth-child(4)
    top -15%
    left 20%
    height 100%
    width 200%
    transform rotate(30deg)
    animation-duration 0.8s
  div:nth-child(5)
    top 90%
    left 30%
    height 100%
    width 100%
    transform rotate(20deg)
    animation-duration 1s
</style>

<template>
  <div class="background">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>

  <Header></Header>

  <div class="wrapper">
    <CircleLoading v-if="!websocketOpened || !$user.isSignedIn" class="loading"></CircleLoading>
    <router-view v-else #default="{ Component }">
      <transition name="scale-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <Popups ref="popups" />
  <Modals ref="modals" />
</template>

<style>
@keyframes scale-out {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.95);
    opacity: 0;
  }
}
@keyframes scale-in {
  0% {
    transform: scale(1.05);
    opacity: 0;
  }
  25% {
    transform: scale(1.05);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.scale-in-enter-active {
  overflow: hidden;
  animation: scale-in .2s ease;
}
.scale-in-leave-active {
  overflow: hidden;
  animation: scale-out .2s ease;
}

.opacity-enter-active {
  animation: opacity .3s;
}
.opacity-leave-active {
  animation: opacity .3s reverse forwards;
}
@keyframes opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<script>
import {getCurrentInstance} from "vue";
import {Modals, Popups} from "@sergtyapkin/modals-popups";
import CircleLoading from "./components/CircleLoading.vue";
import LocalStorageManager from "~/utils/localStorageManager";
import Header from "~/components/Header.vue";


export default {
  components: {Header, CircleLoading, Modals, Popups },

  data() {
    return {
      transitionName: "",
      websocketOpened: false,

      global: undefined,
    }
  },

  watch: {
    $route(to, from) {
      this.transitionName = 'scale-in';

      console.log(from.path, 'TO', to.path)
    },
  },

  async mounted() {
    this.global = getCurrentInstance().appContext.config.globalProperties;

    this.global.$user = this.$store.state.user;
    this.$user = this.global.$user;
    this.global.$modal = this.$refs.modals;
    this.global.$popups = this.$refs.popups;
    this.global.$localStorage = new LocalStorageManager();
    this.$localStorage = this.global.$localStorage;
    this.global.$app = this;

    this.checkMobileScreen();
    window.addEventListener('resize', () => {
      this.checkMobileScreen();
    });


    // ------ Setup basic WS handlers --------
    this.$ws.onopen = () => {this.websocketOpened = true};
    this.$ws.onerror = () => {
      this.$popups.error('Ошибка подключения:', 'Сервер недоступен');
    }
    this.$ws.open();

    // ------ If user not logined - wait for login --------
    await this.loginUser();

    if (this.$user.isAdmin) {
      return;
    }

    // No fragment
    const fragmentData = this.$localStorage.loadSelectedFragment();
    if (!fragmentData) {
      this.$router.push({name: 'chooseMilestone'});
      return;
    }

    // Go to editor
    this.$router.push({name: 'play'});
  },

  methods: {
    async loginUser() {
      this.$store.dispatch('LOAD_USER', this.$localStorage);
      if (this.$user.isSignedIn) {
        return;
      }
      let userName;
      while (!userName) {
        userName = await this.$modal.prompt("Введите ваше имя", "Имя будет отображаться для всех. Да, сюда можно написать \"ХУХ\", но давайте, пожалуйста, без бан-вордов", "", "Ваше имя...")
      }
      this.$ws.send('login_user', {username: userName});
      await new Promise(resolve => {
        this.$ws.handlers.user_logined = (data) => {
          this.$store.dispatch('SET_USER', data, this.$localStorage);
          resolve();
        }
      });
    },

    checkMobileScreen() {
      if (window.innerWidth <= 700) {
        this.global!.$isMobile = true;
        return;
      }
      this.global!.$isMobile = false;
    },
  },

  watch: {
    $route(to, from) {
      this.transitionName = 'scale-in';

      console.log(from.path, 'TO', to.path);
    },
  },
};
</script>
