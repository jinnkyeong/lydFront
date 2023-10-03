<template>
  <v-app>
    <!-- v-app-bar -->
    <default-bar />
    <!-- navigation drawer -->
    <v-navigation-drawer floating permanent>
      <div class="pt-10 pl-7">
        <span>
          <font-awesome-icon icon="fa-solid fa-minus" rotation="90" size="xl" />
        </span>
        <span class="pl-1">
          <span class="title-regular">내 정보</span>
        </span>
      </div>

      <!-- 고객인 경우 -->
      <!--  -->
      <v-list class="pt-10 text-center" nav>
        <v-list-item value="info-sec" @click="this.$router.push('/cusInfo')">
          <span class="nav-label"><p>기본 정보 / 보안</p></span>
        </v-list-item>
        <v-list-item
          value="commit"
          @click="this.$router.push('/cusInfo/cusInfoCommit')">
          <span class="nav-label"><p>내 의뢰서 목록</p></span>
        </v-list-item>
        <v-list-item
          value="inquiry"
          @click="this.$router.push('/cusInfo/cusInfoInquiry')">
          <span class="nav-label"><p>내 산책 문의 목록</p></span>
        </v-list-item>
        <v-list-item
          value="offer"
          @click="this.$router.push('/cusInfo/cusInfoOffer')">
          <span class="nav-label"><p>받은 제안 내역</p></span>
        </v-list-item>
        <v-list-item
          value="reserv"
          @click="this.$router.push('/cusInfo/cusInfoReserv')">
          <span class="nav-label"><p>예약 내역</p></span>
        </v-list-item>
        <v-list-item
          value="diary"
          @click="this.$router.push('/cusInfo/cusInfoDiary')">
          <span class="nav-label"><p>산책일지</p></span>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- v-main -->
    <default-view />
    <!-- dialog -->
    <router-view name="dialog"></router-view>
    <!-- alert -->
    <v-row justify="center">
      <Alert />
    </v-row>
  </v-app>
</template>

<script>
import Alert from '@/components/Alert';
import DefaultBar from '../default/AppBar.vue';
import DefaultView from '../default/View.vue';

export default {
  components: {
    Alert,
    DefaultBar,
    DefaultView,
  },
  data() {
    return {};
  },
};
</script>
