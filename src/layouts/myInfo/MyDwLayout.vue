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
      <!-- 도그워커인 경우 -->
      <v-list class="pt-10 text-center" nav>
        <v-list-item value="info-sec" @click="this.$router.push('/dwInfo')">
          <span class="nav-label">
            <p>기본 정보 / 보안</p>
          </span>
        </v-list-item>
        <v-list-item
          value="study"
          @click="this.$router.push('/dwInfo/dwInfoStudy')">
          <span class="nav-label">
            <p>내 학습 내역</p>
          </span>
        </v-list-item>
        <v-list-item
          value="apply"
          @click="this.$router.push('/dwInfo/dwInfoApply')">
          <span class="nav-label">
            <p>내 지원서 목록</p>
          </span>
        </v-list-item>
        <v-list-item
          value="commit"
          @click="this.$router.push('/dwInfo/dwInfoInquiry')">
          <span class="nav-label">
            <p>받은 의뢰 내역</p>
          </span>
        </v-list-item>
        <v-list-item
          value="offer"
          @click="this.$router.push('/dwInfo/dwInfoOffer')">
          <span class="nav-label">
            <p>내 제안 목록</p>
          </span>
        </v-list-item>
        <v-list-item
          value="reserv"
          @click="this.$router.push('/dwInfo/dwInfoReserv')">
          <span class="nav-label">
            <p>예약 내역</p>
          </span>
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
