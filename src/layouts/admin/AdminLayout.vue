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
        <span class="pl-1">내 정보</span>
      </div>
      <v-list class="pt-10 text-center" nav>
        <v-list-item value="info-sec" @click="this.$router.push('/admin')">
          <span class="nav-label">admin 메인</span>
        </v-list-item>
        <v-list-item
          value="commit"
          @click="this.$router.push('/admin/dwManage')">
          <span class="nav-label">도그워커 관리</span>
        </v-list-item>
        <v-list-item
          value="inquiry"
          @click="this.$router.push('/admin/reservManage')">
          <span class="nav-label">예약 관리</span>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- v-main -->
    <default-view />
    <!-- dialog -->
    <router-view name="dialog"></router-view>
  </v-app>
</template>

<script>
import DefaultBar from '../default/AppBar.vue';
import DefaultView from '../default/View.vue';

export default {
  components: {
    DefaultBar,
    DefaultView,
  },
  data() {
    return {};
  },
};
</script>
