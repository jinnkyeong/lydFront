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
          <h3>정말로 문의를 수락하시겠습니까?</h3>
        </div>
      </v-card-title>

      <v-card-text>
        <div class="desc ma-1">
          문의를 바로 수락하거나 지원서를 변경하여 수락하실 수 있습니다
        </div>
        <div class="desc ma-1">
          문의를 바로 수락하시는 경우에는 수락
          <span class="highlight">즉시</span>
          예약이 성립됩니다
        </div>
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
            <v-btn size="large" block @click="clickAccept" color="primary"
              >즉시 수락하기</v-btn
            >
          </v-col>
          <v-col cols="12" md="4" align-self="center">
            <v-btn size="large" block @click="clickChange" color="secondary">
              지원서 변경
            </v-btn>
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
    // 바로 문의 수락
    clickAccept() {
      inquiryApi
        .postReserv(this.$store.state.item.inquiryId)
        .then((res) => {
          console.log('postReserv ', res.data);
          this.$router.push('/dwInfo/dwInfoInquiry/acceptInqSuccess'); // 수락 완료 창
          this.$store.commit('setOpen', true); // 수락 완료 창 열기
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 내 지원서 수정 하러가기
    clickChange() {
      this.$store.commit('changeApp', this.$store.state.item.appId);
      this.$router.push('/detailDwMod');
    },
  },
};
</script>

<style></style>
