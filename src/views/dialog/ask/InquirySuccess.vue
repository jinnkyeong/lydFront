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
            도그워커
            <span class="primary-color">{{ $route.query.dogwalkerNick }}</span>
            에게
          </div>
          <div>산책 문의를 완료했습니다.</div>
        </h3>
      </div>

      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" md="12">
            <div>
              도그워커가 <span class="secondary-color">의뢰를 수락</span>하는
              때에 예약이 완료됩니다.
            </div>
            <div>
              의뢰의 상태정보는 ‘내 정보 - 내 문의 내역’에서 확인할 수 있습니다.
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
            <v-btn @click="goToMyInquiry" size="large" color="primary">
              <span class="pl-3 pr-3 white text-regular">문의 내역으로</span>
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
