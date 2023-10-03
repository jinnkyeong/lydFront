<template>
  <v-dialog
    class="dialog"
    width="auto"
    transition="dialog-top-transition"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card class="pa-10">
      <div>
        <h3 class="pa-6">
          <div>
            <span class="primary-color">{{ $route.query.customerNick }}</span>
            <span>고객님에게 </span>
          </div>
          <div>의뢰 제안을 완료했습니다.</div>
        </h3>
      </div>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" md="12">
            <div>
              고객님이 <span class="secondary-color">해당 제안을 수락</span>하는
              때에 예약이 완료됩니다.
            </div>
            <div>
              의뢰의 상태정보는 ‘내 정보 - 내 제안 내역’에서 확인할 수 있습니다.
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <div class="mt-10">
        <v-row justify="center" class="text-center">
          <v-spacer />
          <v-col cols="12" md="4" align-self="center">
            <v-btn @click="goToMain" size="large" color="grey">
              <span class="pl-3 pr-3 white text-regular">메인으로</span>
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="4" align-self="center">
            <v-btn @click="goToMyOffer" size="large" color="primary">
              <span class="pl-3 pr-3 white text-regular">제안 내역으로</span>
            </v-btn>
          </v-col>
          <v-spacer />
        </v-row>
        <v-spacer style="height: 20px" />
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
    goToMyOffer() {
      this.$router.push('/dwInfo/dwInfoOffer'); // 내 정보- 제안내역으로
    },
  },
};
</script>

<style></style>
