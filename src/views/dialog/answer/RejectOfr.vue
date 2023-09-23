<template>
  <v-dialog
    width="auto"
    class="dialog"
    transition="dialog-top-transition"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card class="pa-10">
      <v-card-title class="ma-5">
        <div>
          <h3>제안을 정말로 거절하시겠습니까?</h3>
        </div>
      </v-card-title>

      <div class="text-center">
        <div class="desc ma-1 primary-color">
          한번 거절된 제안은 되돌릴 수 없습니다.
        </div>
      </div>

      <div class="ma-5">
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
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
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
    // 바로 제안 거절
    clickReject() {
      offerApi
        .invalidateOffer(this.$store.state.item.offerId, 3) // 거절
        .then((res) => {
          console.log('invalidateOffer ', res.data);
          this.$router.push('/cusInfo/cusInfoOffer/rejectOfrSuccess'); // 거절 완료 창
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
