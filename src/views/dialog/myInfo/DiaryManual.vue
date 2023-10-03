<template>
  <v-dialog class="dialog" v-model="$store.state.just_state.open" width="600">
    <v-card color="grey_lighter">
      <v-row class="ma-16">
        <v-spacer />
        <v-col cols="12" md="10">
          <v-container>
            <v-row justify="center">
              <h3 class="ma-10">산책일지 작성 매뉴얼</h3>
            </v-row>

            <v-row>
              <div class="black semi-bold mt-16 mb-3">필수사항</div>
            </v-row>

            <v-row>
              <div>
                <v-row class="secondary-color mt-4">고객님 댁에 방문 시</v-row>
                <v-row v-for="f in firstList" :key="f">
                  <v-col cols="12" md="2">
                    <span class="grey">
                      <font-awesome-icon icon="fa-solid fa-check" size="lg" />
                    </span>
                  </v-col>
                  <v-col cols="12" md="10">{{ f }}</v-col>
                </v-row>
                <v-row></v-row>
              </div>
            </v-row>
            <v-row>
              <div>
                <v-row class="secondary-color mt-4">산책 나가기 전</v-row>
                <v-row v-for="s in secondList" :key="s">
                  <v-col cols="12" md="2">
                    <span class="grey">
                      <font-awesome-icon icon="fa-solid fa-check" size="lg" />
                    </span>
                  </v-col>
                  <v-col cols="12" md="10">{{ s }}</v-col>
                </v-row>
                <v-row></v-row>
              </div>
            </v-row>
            <v-row>
              <div>
                <v-row class="secondary-color mt-4">산책 중</v-row>
                <v-row v-for="t in thirdList" :key="t">
                  <v-col cols="12" md="2">
                    <span class="grey">
                      <font-awesome-icon icon="fa-solid fa-check" size="lg" />
                    </span>
                  </v-col>
                  <v-col cols="12" md="10">{{ t }}</v-col>
                </v-row>
                <v-row></v-row>
              </div>
            </v-row>
            <v-row>
              <div>
                <v-row class="secondary-color mt-4">산책 완료</v-row>
                <v-row v-for="f in fourthList" :key="f">
                  <v-col cols="12" md="2">
                    <span class="grey">
                      <font-awesome-icon icon="fa-solid fa-check" size="lg" />
                    </span>
                  </v-col>
                  <v-col cols="12" md="10">{{ f }}</v-col>
                </v-row>
                <v-row></v-row>
              </div>
            </v-row>
            <v-row>
              <div class="black semi-bold mt-16 mb-3">고객의 요청사항</div>
            </v-row>
            <v-row class="mb-5">
              <div>
                <v-row justify="center">
                  <v-col>
                    <span class="black">
                      고객님의 요청사항을 가능한 한 모두 수행 하도록
                      노력해주세요! 요청사항은 산책일지에서 확인할 수 있습니다
                    </span>
                  </v-col>
                </v-row>
                <v-row></v-row>
              </div>
            </v-row>
            <v-row justify="center">
              <v-btn
                class="ma-16"
                @click="clickWrite"
                color="primary"
                size="large">
                <span class="white text-regular"> 작성하기 </span>
              </v-btn>
            </v-row>
          </v-container>
        </v-col>
        <v-spacer />
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import myInfoApi from '@/api/myInfoApi';

export default {
  created() {
    // myInfoApi
    //   .getBasicRequiresByReservId(this.$store.state.item.reservId)
    //   .then((res) => {
    //     for (let i = 0; i < res.data.length; i++) {
    //       if (res.data[i].typeEssential === 1) {
    //         this.firstList.push(res.data[i]);
    //       } else if (res.data[i].typeEssential === 2) {
    //         this.secondList.push(res.data[i]);
    //       } else if (res.data[i].typeEssential === 3) {
    //         this.thirdList.push(res.data[i]);
    //       } else if (res.data[i].typeEssential === 4) {
    //         this.fourthList.push(res.data[i]);
    //       }
    //     }
    //   });
  },
  data() {
    return {
      // 1: 방문 시 2: 산책 전 3: 산책 중 4: 산책 완료
      firstList: [
        '반려견과 커뮤니케이션(최소 15분) ',
        '산책줄을 올바르게 착용',
      ],
      secondList: ['문 단속', '준비물을 모두 챙겼는지 확인'],
      thirdList: [
        '산책로가 지정된 경우 해당 산책로에서 산책하기',
        '건강상태에 맞는 페이스 조절',
        '적어도 10분 마다 물 마시게 하기',
        '심하게 짖는 경우 손으로 시야를 가려 흥분을 가라 앉히기',
        '도그워커에게 공격적인 경우 본사로 연락하여 산책 포기 가능',
      ],
      fourthList: [
        '방문했던 장소로 강아지를 이동',
        '목줄 풀어주기',
        '산책일지에서 산책완료 버튼 클릭',
        '문 단속하기',
      ],
    };
  },
  methods: {
    clickWrite() {
      //작성하기 폼으로
      this.$router.push('/dwInfo/reservDetail/diaryForm');
    },
  },
};
</script>

<style>
.type {
  color: blue;
}
</style>
