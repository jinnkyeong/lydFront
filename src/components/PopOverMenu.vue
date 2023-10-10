<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      class="menu-list"
      :close-on-content-click="false"
      location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="text-none" stacked>
          <div
            v-if="!$store.state.login.adminId"
            class="bar-menu secondary-color menu-list">
            반갑습니다 {{ nick ? nick : '손' }}님
          </div>
          <div
            v-if="$store.state.login.adminId"
            class="bar-menu secondary-color menu-list">
            관리자 {{ adminId }} 로그인 중
          </div>
        </v-btn>
      </template>

      <v-card min-width="300">
        <!-- 유저정보 -->
        <!-- 프로필사진 -->
        <v-list v-if="!$store.state.login.adminId">
          <v-list-item
            @click="clickMyInfo"
            v-if="$store.state.login.userImgUrl"
            :prepend-avatar="$store.state.login.userImgUrl"
            :title="nick"
            :subtitle="describe(userType, cnt)">
          </v-list-item>
          <v-list-item
            @click="clickMyInfo"
            v-if="!$store.state.login.userImgUrl"
            :prepend-avatar="
              require('@/assets/images/profile/profileImage.jpg')
            "
            :title="nick"
            :subtitle="describe(userType, cnt)">
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <!-- 버튼 -->
        <v-list>
          <!-- 내 정보 -->
          <v-list-item v-if="!$store.state.login.adminId">
            <v-btn block @click="clickMyInfo" class="menu-list bar-menu">
              내 정보
            </v-btn>
          </v-list-item>

          <!-- logout -->
          <v-list-item>
            <v-btn block @click="logout" class="menu-list bar-menu">
              로그아웃
            </v-btn>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            @click="menu = false"
            size="small"
            color="grey"
            class="menu-list bar-menu"
            >닫기</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  mounted() {
    if (!this.$store.state.login.adminId) {
      this.nick = this.$store.state.login.usernick;
      this.userType = this.$store.state.login.dwId ? 'dogwalker' : 'customer';
      this.cnt = this.$store.state.login.goalCnt;
    } else {
      this.nick = '';
      this.userType = '';
      this.cnt = '';
      this.userImgUrl = '';
    }
  },
  updated() {
    if (!this.$store.state.login.adminId) {
      this.nick = this.$store.state.login.usernick;
      this.userType = this.$store.state.login.dwId ? 'dogwalker' : 'customer';
      this.cnt = this.$store.state.login.goalCnt;
    } else {
      this.nick = '';
      this.userType = '';
      this.cnt = '';
      this.userImgUrl = '';
    }
  },
  data: () => ({
    menu: false, // popovermenu 닫기
    nick: '',
    userType: '',
    userImgUrl: '',
    cnt: null, // cnt = 산책건수 or 이용건수
  }),
  methods: {
    logout() {
      this.menu = false;
      this.$store.dispatch('doLogout');
    },
    clickMyInfo() {
      this.menu = false; // 창 닫기

      if (
        (this.$store.state.login.cusId &&
          this.$store.state.login.dwId === '') ||
        this.$store.state.login.dwId === null ||
        !this.$store.state.login.dwId ||
        this.$store.state.login.dwId === 'null'
      ) {
        // 고객이 로그인한 경우
        this.$router.push('/cusInfo'); // 내 정보 메인으로
      } else if (
        (this.$store.state.login.dwId &&
          this.$store.state.login.cusId === '') ||
        this.$store.state.login.cusId === null ||
        !this.$store.state.login.cusId ||
        this.$store.state.login.cusId === 'null'
      ) {
        // 도그워커가 로그인 한 경우
        this.$router.push('/dwInfo'); // 내 정보 메인으로
      } else {
        console.log('예상밖인ㄷ[...]');
      }
    },
    clickDiaryWrite() {
      this.menu = false;
      // this.$router.push('myInfoMain'); // 산책일지 작성하기
    },
    clickDiaryRead() {
      this.menu = false;
      // this.$router.push('myInfoMain'); // 산책일지 보러가기
    },
    describe(userType, cnt) {
      let strs;
      if (userType === 'dogwalker') {
        strs = '도그워커\t\t산책수행 ' + cnt + ' 회';
      } else {
        strs = '고객\t\t이용건수 ' + cnt + ' 회';
      }
      return strs;
    },
  },
};
</script>

<style></style>
