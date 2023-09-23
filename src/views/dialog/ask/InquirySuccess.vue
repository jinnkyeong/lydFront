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
          도그워커
          <span class="highlight">{{ $route.query.dogwalkerNick }}</span
          >에게 산책 문의를 완료했습니다.
        </h3>
      </div>

      <v-card-text>
        <v-row no-gutters class="pa-3">
          <div>
            도그워커가 <span class="highlight">의뢰를 수락</span>하는 때에
            예약이 완료됩니다.
          </div>
        </v-row>
        <v-row no-gutters class="pa-3">
          <div>의뢰의 상태정보는 ‘내 정보 - 내 문의 내역’에서 확인할</div>
        </v-row>
        <v-row no-gutters class="pa-3">
          <div>수 있습니다.</div>
        </v-row>
      </v-card-text>
      <div class="pt-5">
        <v-row justify="center" class="text-center">
          <v-col cols="12" md="4" align-self="center">
            <v-btn @click="goToMain" color="grey"
              ><span class="pl-3 pr-3">메인으로</span></v-btn
            >
          </v-col>
          <v-spacer />
          <v-col cols="12" md="4" align-self="center">
            <v-btn @click="goToMyInquiry" color="primary"
              >내 문의 내역으로</v-btn
            >
          </v-col>
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
    return {
      info: {
        customerName: '김진경',
        customerPrice: 15000,
        dogwalkerName: '김유진',
        dogwalkerPrice: 13000,
      },
      newPrice: null,
    };
  },
  methods: {
    goToMain() {
      this.$store.commit('setOpen', false); // 창 닫기
      this.$router.push('/'); // 메인으로
    },
    goToMyInquiry() {
      this.$router.push('/cusInfo/cusInfoInquiry'); // 내 정보- 문의내역으로
    },
  },
};
</script>

<style></style>
