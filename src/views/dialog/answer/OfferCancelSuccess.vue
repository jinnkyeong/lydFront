<template>
  <v-dialog
    class="dialog"
    width="auto"
    transition="dialog-top-transition"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card class="pa-10">
      <v-spacer style="height: 50px" />
      <v-row justify="center">
        <div class="mt-6 mb-6 text-regular">제안이 취소되었습니다</div>
      </v-row>
      <v-row no-gutters class="pt-6 pb-1 desc">
        <div>
          <div>취소된 제안 내역은 '내 제안내역'에서</div>
          <div>확인할 수 있습니다</div>
        </div>
      </v-row>
      <v-spacer style="height: 50px" />

      <v-row justify="center" class="pt-5 text-center">
        <v-spacer />
        <v-col cols="12" md="4" align-self="center">
          <v-btn @click="close" color="grey" block>
            <span class="text-regular white">확인</span>
          </v-btn>
        </v-col>
        <v-spacer />
      </v-row>
      <v-spacer style="height: 50px" />
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
    close() {
      this.$store.commit('setOpen', false); // 창 닫기
      this.$router.go(0);
    },
  },
};
</script>

<style></style>
