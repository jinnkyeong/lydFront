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
          <h3>산책 제안을 정말로 거절하시겠습니까?</h3>
        </div>
      </v-card-title>

      <v-card-text>
        <v-row justify="center">
          <div class="desc">한번 거절된 제안은 되돌릴 수 없습니다.</div>
        </v-row>
      </v-card-text>
      <v-row class="mt-5">
        <v-spacer />
        <v-col cols="12" md="4" align-self="center">
          <v-btn size="large" block @click="clickCancel" color="grey"
            ><span class="pl-3 pr-3 white text-regular">취소</span></v-btn
          >
        </v-col>
        <v-spacer />
        <v-col cols="12" md="4" align-self="center">
          <v-btn size="large" block @click="clickReject" color="primary"
            ><span class="pl-3 pr-3 white text-regular">거절</span></v-btn
          >
        </v-col>
        <v-spacer />
      </v-row>
      <v-spacer style="height: 20px" />
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
