<template>
  <v-card class="mx-auto" width="300" height="400px">
    <v-container>
      <!-- <span><font-awesome-icon icon="fa-solid fa-eye" /></span> -->
      <div class="text-micro grey-little-light">
        <span v-if="comm.view" class="mr-1">조회</span>
        <span v-if="comm.view">{{ comm.view }}</span>
        <span v-if="!comm.view" style="height: 23px" />
      </div>
      <!-- 이미지 -->
      <v-row no-gutters="" class="ma-1 mb-3">
        <v-img
          v-if="comm.imgUrl"
          :src="comm.imgUrl"
          width="147"
          aspect-ratio="4/3"
          max-height="150"
          style="border-radius: 15px"
          cover />
        <v-img
          v-if="!comm.imgUrl"
          src="@/assets/images/profile/profileImage.jpg"
          width="147"
          aspect-ratio="4/3"
          max-height="150"
          style="border-radius: 15px"
          cover />
      </v-row>
      <!-- 인물정보 -->
      <v-row no-gutters class="ma-1">
        <v-spacer />
        <v-col cols="12" md="2" class="secondary-color">
          <font-awesome-icon icon="fa-solid fa-user" />
        </v-col>
        <v-col cols="12" md="9">
          {{ comm.nick }} / {{ comm.gen === 'm' ? '남' : '여' }} /
          {{ getAge(comm.birthYear) }} 세
        </v-col>
      </v-row>
      <!-- 주소 -->
      <v-row no-gutters="" class="ma-1">
        <v-spacer />
        <v-col cols="12" md="2" class="secondary-color">
          <font-awesome-icon icon="fa-solid fa-location-dot" />
        </v-col>
        <v-col cols="12" md="9">
          {{ comm.addrState }} {{ comm.addrTown }}
        </v-col>
      </v-row>
      <!-- 강아지 정보 -->
      <v-row no-gutters="" class="ma-1">
        <v-spacer />
        <v-col cols="12" md="2" class="secondary-color">
          <font-awesome-icon icon="fa-solid fa-dog" />
        </v-col>
        <v-col cols="12" md="9">
          <div>
            <span>
              {{ dogTypeConvert(comm.dogType) }}
            </span>
            <span>
              / 공격성
              {{ dogAggrConvert(comm.dogAggr) }}
            </span>
          </div>
          <div>
            <span>
              / 건강
              {{ dogHealthConvert(comm.dogHealth) }}
            </span>
          </div>
        </v-col>
      </v-row>
      <!-- 날짜 시간 -->
      <v-row no-gutters="" class="ma-1">
        <v-spacer />
        <v-col cols="12" md="2" class="secondary-color">
          <font-awesome-icon icon="fa-solid fa-clock" />
        </v-col>
        <v-col cols="12" md="9">
          <div>
            <span class="mr-2"> {{ comm.month }}월 {{ comm.day }}일 </span>
            <span>{{ comm.startHour }} : {{ comm.startMin }} </span>
            <span> ~ </span>
            <span> {{ comm.endHour }} : {{ comm.endMin }}</span>
          </div>
        </v-col>
      </v-row>
      <!-- 시간당 가격 -->
      <v-row no-gutters="" class="ma-1">
        <v-spacer />
        <v-col cols="12" md="2" class="secondary-color">
          <font-awesome-icon icon="fa-solid fa-money-bill" />
        </v-col>
        <v-col cols="12" md="9">
          <div>시간당 {{ comm.price }} 원</div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    comm: Object,
  },

  methods: {
    getAge(birthYear) {
      let now = new Date(); // 현재 날짜 및 시간
      return now.getFullYear() - birthYear;
    },
    dogTypeConvert(dogTypeCode) {
      if (dogTypeCode) {
        switch (dogTypeCode) {
          case 1:
            return '소형견';
          case 2:
            return '중형견';
          case 3:
            return '대형견';
          case 4:
            return '초대형견';
          default:
            return dogTypeCode;
        }
      }
    },
    dogAggrConvert(aggrCode) {
      switch (aggrCode) {
        case 1:
          return '매우 양호';
        case 2:
          return '약간 양호';
        case 3:
          return '보통';
        case 4:
          return '약간 심함';
        case 5:
          return '매우 심함';
        default:
          return aggrCode;
      }
    },
    dogHealthConvert(healthCode) {
      switch (healthCode) {
        case 1:
          return '매우 나쁨';
        case 2:
          return '약간 나쁨';
        case 3:
          return '보통';
        case 4:
          return '약간 좋음';
        case 5:
          return '매우 좋음';
        default:
          return healthCode;
      }
    },
  },
  updated() {
    // mounted 하면 안나옴
    console.log(this.comm);
  },
};
</script>

<style>
.mx-auto {
  border-radius: 30px;
}
</style>
