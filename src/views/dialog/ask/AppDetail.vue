<template>
  <v-dialog
    class="dialog"
    width="1000px"
    transition="dialog-top-transition"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card class="pa-10">
      <v-card-title>
        <div class="pa-6">도그워커 지원서 상세보기</div>
      </v-card-title>

      <v-card-subtitle>
        <div class="pa-4">
          고르신 지원서를 확인해 주세요. 해당 지원서를 선택하시겠습니까?
        </div>
      </v-card-subtitle>

      <v-card-text>
        <!-- 의뢰서 정보 -->
        <v-row justify="center" no-gutters class="pa-3"> </v-row>
        <v-row justify="center" no-gutters class="pa-3">
          <DetailDw :info="info" />
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-row justify="center" class="text-center">
          <v-col cols="12" md="4" align-self="center">
            <v-btn
              @click="clickSelect"
              color="primary"
              variant="tonal"
              size="large"
              >선택 완료</v-btn
            >
          </v-col>
          <v-spacer />
          <v-col cols="12" md="4" align-self="center">
            <v-btn
              @click="clickCancel"
              color="grey"
              variant="tonal"
              size="large"
              >취소</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import applyApi from '@/api/applyApi';
import DetailDw from '@/components/DetailDw';

export default {
  created() {
    applyApi
      .getAppById(this.$route.query.appId)
      .then((res) => {
        this.info = res.data;
        console.log(this.info);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  components: {
    DetailDw,
  },
  data() {
    return {
      info: {},
    };
  },
  methods: {
    clickCancel() {
      this.$router.push('offer'); // 문의창으로 돌아가기
    },
    clickSelect() {
      // 의뢰서 선택 완료
      this.$store.commit('setAppId', this.info.applicationId); // 고른 applicationId 저장
      this.$router.push('offer'); // 문의창으로 돌아가기
    },
  },
};
</script>

<style></style>
