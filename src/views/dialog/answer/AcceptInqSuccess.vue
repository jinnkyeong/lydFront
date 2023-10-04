<template>
  <v-dialog
    class="dialog"
    width="auto"
    transition="dialog-top-transition"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card class="pa-10">
      <v-card-title>
        <h3 class="pa-6">
          <div>의뢰를 수락하여</div>
          <div>예약이 완료되었습니다.</div>
        </h3>
      </v-card-title>

      <v-card-text>
        <v-row no-gutters class="pa-3">
          <v-col cols="12" md="12">
            <div>예약 정보는 ‘내 정보 - 예약 내역’에서 확인할</div>
            <div>수 있습니다.</div>
          </v-col>
        </v-row>
        <v-row no-gutters class="pa-3"> </v-row>
      </v-card-text>

      <div class="pt-5">
        <v-row justify="center" class="text-center">
          <v-spacer />

          <v-col cols="12" md="4" align-self="center">
            <v-btn @click="goToMain" color="grey">
              <span class="white text-regular"> 메인으로 </span>
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="4" align-self="center">
            <v-btn @click="goToMyReserv" color="primary">
              <span class="white text-regular pl-2 pr-2"> 예약내역으로 </span>
            </v-btn>
          </v-col>
          <v-spacer />
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import inquiryApi from '@/api/inquiryApi';
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    goToMain() {
      this.$store.commit('setOpen', false); // 창 닫기
      this.$router.push('/'); // 메인으로
    },
    goToMyReserv() {
      this.$router.push('/dwInfo/dwInfoReserv'); // 내 정보- 예약내역으로
    },
  },
};
</script>

<style></style>
