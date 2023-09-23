<template>
  <v-dialog
    class="dialog"
    width="1000px"
    transition="dialog-top-transition"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card class="pa-10">
      <h3 class="pa-6">의뢰서 상세보기</h3>
      <div class="pa-4 desc">
        고르신 의뢰서를 확인해 주세요. 해당 의뢰서를 선택하시겠습니까?
      </div>

      <!-- 의뢰서 정보 -->
      <v-row justify="center" no-gutters class="pa-3"> </v-row>
      <v-row justify="center" no-gutters>
        <DetailCus :info="info" />
      </v-row>

      <v-spacer style="height: 200px" />
      <v-row justify="center" class="text-center mt-7 mb-15">
        <v-col cols="12" md="4" align-self="center">
          <v-btn @click="clickSelect" color="primary" size="x-large">
            <span class="white text-regular">선택 완료</span>
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="4" align-self="center">
          <v-btn @click="clickCancel" color="grey" size="x-large">
            <span class="white text-regular">취소</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import inquiryApi from '@/api/inquiryApi';
import commitApi from '@/api/commitApi';
import DetailCus from '@/components/DetailCus.vue';

export default {
  created() {
    // this.$store.state.customerId
    console.log('router query comId : ', this.$route.query.comId);
    // commisionId -> commision
    commitApi
      .getCmById(this.$route.query.comId)
      .then((res) => {
        this.info = res.data;
        console.log(this.info);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  components: {
    DetailCus,
  },
  data() {
    return {
      info: {},
    };
  },
  methods: {
    clickCancel() {
      this.$router.push('inquiry'); // 문의창으로 돌아가기
    },
    clickSelect() {
      // 의뢰서 선택 완료
      this.$store.commit('setComId', this.info.commisionId); // 고른 commisionId 저장
      this.$router.push('inquiry'); // 문의창으로 돌아가기
    },
  },
};
</script>

<style></style>
