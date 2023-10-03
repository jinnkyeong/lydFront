<template>
  <v-container class="pa-16 detail-box">
    <!-- 예약날짜 -->
    <v-row justify="end">
      <v-chip class="ma-2" size="large" color="secondary">
        {{ formatDateTime(info.reservCreatedAt) }} 예약
      </v-chip>
    </v-row>
    <!-- 타이틀 -->
    <v-row>
      <div class="title">
        {{ title }}
      </div>
    </v-row>
    <!-- 설명 -->
    <v-row class="mt-5" no-gutters>
      <v-col cols="12" md="12">
        <div class="desc">
          {{ subtitle }}
        </div>
      </v-col>
    </v-row>
    <v-spacer style="height: 100px" />
    <!-- 예약자 정보 -->
    <v-row class="mt-7 mb-3">
      <div class="text-regular semi-bold grey">예약자 정보</div>
    </v-row>
    <!-- 예약자 정보 -->
    <v-row justify="center">
      <v-col cols="12" md="4">
        <div class="secondary-color">도그워커 지원서</div>
        <Figure
          @click="selectApp(info.applicationDto.applicationId)"
          :appl="info.applicationDto" />
      </v-col>
      <v-col cols="12" md="4" align-self="center">
        <div>
          <v-divider thickness="4" />
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="secondary-color">고객 의뢰서</div>
        <FigureCus
          @click="selectCom(info.commisionDto.commisionId)"
          :comm="info.commisionDto" />
      </v-col>
    </v-row>
    <v-spacer style="height: 100px" />
    <!-- 예약 정보 -->
    <v-row class="mt-7 mb-3">
      <div class="text-regular semi-bold grey">예약 정보</div>
    </v-row>
    <!-- 예약 정보 -->
    <v-row>
      <v-container class="back-grey-light">
        <v-row>
          <v-col cols="12" md="4">
            <span class="label">산책 예정 일자</span>
          </v-col>
          <v-col
            >{{ info.commisionDto.month }} 월{{
              info.commisionDto.month
            }}
            일</v-col
          >
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <span class="label">시작 시간</span>
          </v-col>
          <v-col
            >{{ info.commisionDto.startHour }}시
            {{ info.commisionDto.startMin }}분
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <span class="label">종료 시간</span>
          </v-col>
          <v-col
            >{{ info.commisionDto.endHour }}시 {{ info.commisionDto.endMin }}분
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <span class="label">고객 주소</span>
          </v-col>
          <v-col
            >{{ info.commisionDto.addrState }}
            {{ info.commisionDto.addrTown }}
            {{ info.commisionDto.addrDetail }}</v-col
          >
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <span class="label">최종 시간당 가격</span>
          </v-col>
          <v-col cols="12" md="4">{{ info.price }} 원</v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import Figure from '../Figure.vue';
import FigureCus from '../FigureCus.vue';
export default {
  props: {
    info: Object,
    title: String,
    subtitle: String,
  },
  components: {
    Figure,
    FigureCus,
  },
  methods: {
    formatDateTime(dt) {
      return new Date(dt).toISOString().split('T')[0];
    },
    selectApp(appId) {
      // 상세보기로 이동
      this.$store.commit('setAppId', appId);
      // this.$store.commit('setTempId', dwId); // 리뷰용
      this.$router.push({ name: 'detailDw', query: { applicationId: appId } }); // 상세보기
    },
    selectCom(comId) {
      // 상세보기로 이동
      this.$store.commit('setComId', comId);
      this.$router.push({ name: 'detailCus', query: { commisionId: comId } }); // 상세보기
    },
  },
};
</script>

<style></style>
