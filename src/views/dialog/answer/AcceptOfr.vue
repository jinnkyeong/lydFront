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
          <h3>산책 제안을 정말로 수락하시겠습니까?</h3>
        </div>
      </v-card-title>

      <v-card-text>
        <div class="desc ma-1">
          제안을 바로 수락하거나 의뢰서를 변경하여 수락하실 수 있습니다
        </div>
        <div class="desc ma-1">
          제안을 바로 수락하시는 경우에는 수락
          <span class="highlight">즉시</span>
          예약이 성립됩니다
        </div>
        <div class="desc ma-1">
          의뢰서를 변경하여 수락하는 경우
          <span class="primary-color semi-bold"
            >상대 고객이 다시 수락하는 때</span
          >
        </div>
        <div class="desc ma-1">에 예약이 성립됩니다</div>
      </v-card-text>

      <v-row class="mt-5">
        <v-spacer />
        <v-col cols="12" md="4" align-self="center">
          <v-btn size="large" block @click="clickCancel" color="grey">
            <span class="white text-regular">취소</span>
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="4" align-self="center">
          <v-btn size="large" block @click="clickAccept" color="primary">
            <span class="white text-regular">즉시 수락</span>
          </v-btn>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row justify="center">
        <v-spacer />
        <v-col cols="12" md="4" align-self="center" />
        <v-spacer />
        <v-col cols="12" md="4" align-self="center">
          <v-btn @click="clickChange" color="secondary" variant="text">
            <span>의뢰서를 변경하여 수락하기</span>
          </v-btn>
        </v-col>
        <v-spacer />
      </v-row>
      <v-spacer />
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
    // 바로 제안을수락
    clickAccept() {
      offerApi
        .postReserv(this.$store.state.item.offerId)
        .then((res) => {
          console.log('postReserv ', res.data);
          this.$router.push('/cusInfo/cusInfoOffer/acceptOfrSuccess'); // 수락 완료 창
          this.$store.commit('setOpen', true); // 수락 완료 창 열기
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 내 의뢰서 수정 하러가기
    clickChange() {
      // this.$store.commit('setComId',)
      this.$router.push('/detailCusMod');
    },
  },
};
</script>

<style></style>
