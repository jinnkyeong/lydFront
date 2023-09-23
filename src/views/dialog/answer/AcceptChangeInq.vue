<template>
  <v-dialog
    class="dialog"
    width="auto"
    transition="dialog-top-transition"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card class="pa-10">
      <v-card-title class="ma-5">
        <div>
          <h3>변경된 지원서로 다시 수락하시겠습니까?</h3>
        </div>
      </v-card-title>

      <v-card-text>
        <div class="desc ma-1">
          지원서를 변경하여 수락하시는 경우에는 상대
          <span class="highlight">고객이 다시 수락하는 때</span>
          에 예약이 성립됩니다
        </div>
      </v-card-text>

      <v-card-actions class="ma-5">
        <v-row justify="center" class="text-center">
          <v-col cols="12" md="4" align-self="center">
            <v-btn size="large" block @click="clickCancel" color="grey"
              >취소</v-btn
            >
          </v-col>
          <v-col cols="12" md="4" align-self="center">
            <v-btn size="large" block @click="clickAccept" color="primary">
              수락하기
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import inquiryApi from '@/api/inquiryApi';
import offerApi from '@/api/offerApi';
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    clickCancel() {
      this.$store.commit('setOpen', false); // 창 닫기
    },
    // 수정하여 문의 수락 = 새로이 제안하는 것
    clickAccept() {
      // 문의 무효화 -> status 5
      console.log(
        'this.$store.state.item.inquiryId',
        this.$store.state.item.inquiryId
      );
      inquiryApi
        .invalidateInquiry(this.$store.state.item.inquiryId, 5)
        .then((res) => {
          console.log('문의 무효화 ', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
      // 새로운 제안 생성 -> status 4
      let info = {
        commisionId: this.$store.state.item.comId,
        applicationId: this.$store.state.item.appId,
        price: 0, // 0으로 넘기면 백에서 지원서 금액으로 넣어줄 것임
      };
      offerApi
        .postOffer(info, 4)
        .then((res) => {
          console.log('새 제안생성 ', res.data);
          this.$store.commit('setOpen', false);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
