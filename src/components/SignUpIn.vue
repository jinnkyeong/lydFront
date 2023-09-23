<template>
  <v-row justify="center" no-gutters>
    <!-- 로그인 전 상태  -->
    <!-- 회원가입 -->
    <span v-if="!this.$store.state.login.accessToken">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" class="text-none" stacked>
            <div class="bar-menu">회원가입</div>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            class="menu-list"
            v-for="(reg, index) in regList"
            :key="index">
            <v-list-item-title
              style="cursor: pointer"
              @click="register(reg.userType)"
              >{{ reg.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </span>
    <!-- 로그인 -->
    <span v-if="!this.$store.state.login.accessToken">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
            v-if="!this.$store.state.login.accessToken"
            class="text-none"
            stacked>
            <div class="bar-menu">로그인</div>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            class="menu-list"
            v-for="(log, index) in logList"
            :key="index">
            <v-list-item-title
              style="cursor: pointer"
              @click="loginn(log.userType)"
              >{{ log.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </span>

    <!-- 로그인 후 상태 -->
    <!-- 알람 -->
    <span v-if="this.$store.state.login.accessToken">
      <v-btn @click="clickAlarm" class="text-none" stacked>
        <!-- 알람있으면 배지 추가 -->
        <v-badge
          :content="$store.state.login.unreadAlarmCnt"
          color="error"
          v-if="$store.state.login.unreadAlarmCnt > 0">
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
        <!-- 알람 없으면 종만 -->
        <v-icon v-if="$store.state.login.unreadAlarmCnt === 0"
          >mdi-bell-outline</v-icon
        >
      </v-btn>
    </span>
    <!-- pop-over-menu -->
    <span v-if="this.$store.state.login.accessToken">
      <pop-over-menu />
    </span>
  </v-row>
</template>

<script>
import PopOverMenu from './PopOverMenu.vue';

export default {
  components: {
    // Login,
    // LoginForm
    PopOverMenu,
  },
  data() {
    return {
      // 로그인,회원가입 옵션
      regList: [
        { userType: 'dogwalker', title: '도그워커로 회원가입' },
        { userType: 'customer', title: '고객으로 회원가입' },
      ],
      logList: [
        { userType: 'dogwalker', title: '도그워커로 로그인' },
        { userType: 'customer', title: '고객으로 로그인' },
      ],
      // 로그인 상태인지 여부 - 로그아웃,로그인 표시 용도
      // authenticated: false,
    };
  },
  computed: {
    // check_authenticated() {
    //   // vuex의 값이 변경될 때 새 값을 반환
    //   return this.$store.state.authenticated;
    // },
  },
  watch: {
    // check_authenticated(val) {
    //   // 그 함수를 watch가 감시하면 새 값을 지역 변수 snackbar에 바로 할당할 수 있습니다.
    //   this.authenticated = val;
    // },
  },
  methods: {
    loginn(userType) {
      this.$store.commit('setUserType', userType); // 유저타입 설정
      // this.$store.login.commit('setOpen', true); // 창 열기
      this.$store.dispatch('doOpen', true); // 창 열기
      this.$router.push('/loginPage'); // 창 이동
      // this.$router.push('searchCus') // 창 이동
    },
    register(userType) {
      this.$store.commit('setUserType', userType);
      this.$store.commit('setOpen', true);
      this.$router.push('/signUp');
      // this.$router.push('searchCus2') // 창 이동
    },
    clickAlarm() {
      console.log('clickAlarm');
      this.$store.commit('setAlarmOpen'); // 끄거나 켜기
    },
  },
};
</script>

<style scoped>
v-list-item-title {
  cursor: pointer;
}
</style>
