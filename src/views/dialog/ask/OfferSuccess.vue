<template>
  <v-dialog
    class="dialog"
    width="auto"
    transition="dialog-top-transition"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card class="pa-10">
      <div class="pa-6">
        <h3 class="highlight">
          <span>{{ $route.query.customerNick }}</span>
          <span>고객님에게 의뢰 제안을 완료했습니다.</span>
        </h3>
      </div>

      <v-row no-gutters class="pl-5">
        <div>
          고객님이 <span class="highlight">해당 제안을 수락</span>하는 때에
          예약이 완료됩니다.
        </div>
      </v-row>

      <v-row no-gutters class="pl-5">
        <div>의뢰의 상태정보는 ‘내 정보 - 내 제안 내역’에서 확인할</div>
      </v-row>
      <v-row no-gutters class="pl-5">
        <div>수 있습니다.</div>
      </v-row>
      <v-card-actions class="pt-5">
        <v-row justify="center" class="text-center">
          <v-col cols="12" md="4" align-self="center">
            <v-btn @click="goToMyOffer" color="primary" variant="tonal"
              >내 제안 내역으로</v-btn
            >
          </v-col>
          <v-spacer />
          <v-col cols="12" md="4" align-self="center">
            <v-btn @click="goToMain" color="grey" variant="tonal"
              >메인으로</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
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
    goToMyOffer() {
      this.$router.push('/dwInfo/dwInfoOffer'); // 내 정보- 제안내역으로
    },
  },
};
</script>

<style></style>
