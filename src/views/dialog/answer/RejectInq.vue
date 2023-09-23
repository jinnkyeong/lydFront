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
          <h3>문의를 정말로 거절하시겠습니까?</h3>
        </div>
      </v-card-title>

      <v-card-text>
        <div class="desc ma-1">한번 거절된 문의를 되돌릴 수 없습니다.</div>
      </v-card-text>

      <v-card-actions class="ma-5">
        <v-row justify="center" class="text-center">
          <v-col cols="12" md="5" align-self="center">
            <v-btn size="large" block @click="clickCancel" color="grey"
              >취소</v-btn
            >
          </v-col>
          <v-col cols="12" md="5" align-self="center">
            <v-btn size="large" block @click="clickReject" color="primary"
              >거절하기</v-btn
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
    clickCancel() {
      this.$store.commit('setOpen', false); // 창 닫기
    },
    // 바로 문의 거절
    clickReject() {
      inquiryApi
        .invalidateInquiry(this.$store.state.item.inquiryId, 3)
        .then((res) => {
          console.log('invalidateInquiry ', res.data);
          this.$router.push('/dwInfo/dwInfoInquiry/rejectInqSuccess'); // 거절 완료 창
          this.$store.commit('setOpen', true); // 거절 완료 창 열기
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
