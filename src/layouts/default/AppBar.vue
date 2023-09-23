<template>
  <!-- 상단바 -->
  <v-app-bar app>
    <v-row class="menu" no-gutters>
      <!-- 로고 -->
      <v-col cols="12" md="2" align-self="center">
        <!-- <img class="img" :src="require(`@/assets/images/logo.png`)"/>  -->
        <!-- <div class="img" :style="{'background-image': 'url(' + require('./assets/images/logo.png') + ')'}"></div> -->
        <div @click="goToMain" class="text-center">
          <v-img
            src="@/assets/images/logo.png"
            :height="40"
            style="cursor: pointer" />
        </div>
      </v-col>
      <!-- 메뉴 -->
      <!-- 찾기 -->
      <v-spacer />
      <v-col cols="12" md="2" sm="12">
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="text-none" stacked>
              <div class="bar-menu">도그워커 및 고객찾기</div>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              class="menu-list"
              v-for="(opt, index) in options"
              :key="index"
              @click="clickSearch(opt.key)">
              <v-list-item-title>{{ opt.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <!-- 지원하기 -->
      <v-col cols="12" md="2" sm="12">
        <v-btn @click="clickApply" class="text-none" stacked>
          <div class="bar-menu">도그워커 지원하기</div>
        </v-btn>
      </v-col>
      <!-- QnA -->
      <v-col cols="12" md="2" sm="12">
        <v-btn @click="clickQnA" class="text-none" stacked>
          <div class="bar-menu">자주묻는질문</div>
        </v-btn>
      </v-col>
      <v-spacer />
      <!-- 로그인,회원가입 -->
      <v-col cols="12" md="2" sm="12">
        <SignUpIn />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import SignUpIn from '@/components/SignUpIn';
export default {
  name: 'App',
  components: {
    SignUpIn,
  },

  data: () => ({
    options: [
      { title: '도그워커 찾기', key: 'dogwalker' },
      { title: '고객 찾기', key: 'customer' },
    ],
  }),

  methods: {
    clickSearch(key) {
      if (key === 'dogwalker') {
        this.$router.push('/searchDw');
      } else if (key === 'customer') {
        this.$router.push('/searchCus');
      } else {
        console.log('key를 다시 확인하시오');
      }
    },
    clickApply() {
      this.$router.push('/application');
    },
    clickQnA() {
      this.$router.push('/qna');
    },
    goToMain() {
      this.$router.push('/');
    },
  },
};
</script>
<style scoped></style>
