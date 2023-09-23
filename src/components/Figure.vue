<template>
  <v-card class="mx-auto" width="300" height="400">
    <v-container>
      <div class="text-micro grey-little-light">
        <span class="mr-1">조회</span>
        <span>{{ appl.view }}</span>
      </div>
      <!-- 이미지 -->
      <v-row no-gutters="" class="ma-1 mb-3">
        <v-img
          v-if="appl.imgUrl"
          :src="appl.imgUrl"
          width="147"
          aspect-ratio="4/3"
          max-height="150"
          style="border-radius: 15px"
          cover />
        <v-img
          v-if="!appl.imgUrl"
          src="@/assets/images/profile/profileImage.jpg"
          width="147"
          aspect-ratio="4/3"
          max-height="150"
          style="border-radius: 15px"
          cover />
      </v-row>
      <!-- 인물정보 -->
      <v-row no-gutters="" class="ma-1">
        <v-spacer />
        <v-col cols="12" md="2" class="secondary-color">
          <font-awesome-icon icon="fa-solid fa-user" />
        </v-col>
        <v-col cols="12" md="9">
          {{ appl.name }} / {{ appl.gen === 'm' ? '남' : '여' }} /
          {{ getAge(appl.birthYear) }} 세
        </v-col>
      </v-row>
      <!-- 주소 -->
      <v-row no-gutters="" class="ma-1">
        <v-spacer />
        <v-col cols="12" md="2" class="secondary-color">
          <font-awesome-icon icon="fa-solid fa-location-dot" />
        </v-col>
        <v-col cols="12" md="9">
          {{ appl.addrState }} {{ appl.addrTown }}
        </v-col>
      </v-row>
      <!-- 자격증 -->
      <v-row no-gutters="" class="ma-1">
        <v-spacer />
        <v-col cols="12" md="2" class="secondary-color">
          <font-awesome-icon icon="fa-solid fa-certificate" />
        </v-col>
        <v-col cols="12" md="9">
          <span v-for="(cert, index) in appl.certificates" :key="index">
            <span v-if="index <= 1">
              <v-chip size="small" class="mr-1">
                {{ certificateConvert(cert.keyword) }}
              </v-chip>
            </span>
            <span v-if="index > 1"> ... </span>
          </span>
          <span v-if="appl.certificates && !appl.certificates[0]">
            보유 자격증 없음</span
          >
        </v-col>
      </v-row>
      <!-- 가격 -->
      <v-row no-gutters="" class="ma-1">
        <v-spacer />
        <v-col cols="12" md="2" class="secondary-color">
          <font-awesome-icon icon="fa-solid fa-money-bill" />
        </v-col>
        <v-col cols="12" md="9"> 시간당 {{ appl.price }}원 </v-col>
      </v-row>
      <!-- 문장 -->
      <v-row no-gutters="" class="ma-4" justify="center">
        <span class="grey">" {{ showSentence(appl.sentence) }} "</span>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import format from '@/utillFunction/format';
export default {
  props: {
    appl: Object,
  },
  methods: {
    getAge(birthYear) {
      let now = new Date(); // 현재 날짜 및 시간
      return now.getFullYear() - birthYear;
    },
    certificateConvert(key) {
      return format.certificateConvert(key);
    },
    // 댓글 내용 미리보기
    showSentence(st) {
      if (st) {
        if (st.length >= 26) {
          // 26자 이상은 자르기
          return st.substring(0, 25) + '...';
        } else {
          return st;
        }
      } else {
        console.log('//');
      }
    },
  },
  updated() {
    // mounted 하면 안나옴
    console.log(this.appl);
  },
};
</script>

<style>
.mx-auto {
  border-radius: 30px;
}
</style>
