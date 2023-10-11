<template>
  <v-dialog class="dialog" v-model="$store.state.just_state.open" width="1000">
    <v-card>
      <v-row justify="center" class="mt-16">
        <v-col cols="12" md="1"></v-col>
        <v-col cols="12" md="3">
          <div class="title">리뷰 작성</div>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row class="mt-9 mb-16">
        <v-spacer />
        <v-col cols="12" md="10">
          <v-container>
            <!-- 예약 정보 요약 -->
            <v-row class="ma-3 pa-3 card">
              <!-- 지원자 이미지 -->
              <!-- <v-col cols="12" md="3">
                <v-img :src="preview" aspect-ratio="16/9" />
              </v-col> -->
              <!-- 지원서 요약정보 -->
              <v-col cols="12" md="8">
                <v-container>
                  <div class="pa-1">
                    {{ resInfo.applicationDto.sentence }}
                  </div>
                  <div class="pa-1">
                    <span class="primary-color pr-2">시작</span>
                    <span>{{ startDt }}</span>
                  </div>
                  <div class="pa-1">
                    <span class="primary-color pr-2">종료</span>
                    <span>{{ endDt }}</span>
                  </div>
                  <div class="pa-1">
                    <span class="secondary-color pr-3">총 결제 금액</span>
                    <span>{{ resInfo.price }} 원</span>
                  </div>
                </v-container>
              </v-col>
              <v-col cols="12" md="4">
                <v-container>
                  <v-row class="mt-3">
                    <div class="grey">서비스에 어느 정도</div>
                    <div class="ml-2 grey">만족하셨나요?</div>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="7" align-self="center">
                      <!-- 별점 -->
                      <v-rating
                        v-model="info.star"
                        color="amber"
                        density="compact"
                        half-increments></v-rating>
                    </v-col>
                    <v-col cols="12" md="5" align-self="center">
                      <!-- 별점 수치 -->
                      <div class="text-grey ml-6 mb-2 text-regular">
                        {{ info.star }}
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <!-- 이미지 미리보기 -->
            <v-row>
              <v-spacer />
              <v-col cols="12" md="5">
                <v-img :src="preview" aspect-ratio="16/9" />
              </v-col>
              <v-spacer />
            </v-row>
            <!-- 내용 -->
            <v-row>
              <v-textarea
                counter
                v-model="info.context"
                :rules="context_rules"
                placeholder="산책 서비스에 대한 리뷰를 작성해주세요."
                variant="solo-filled"></v-textarea>
            </v-row>
            <!-- file input field -->
            <v-row justify="center">
              <v-col cols="12" md="10">
                <v-file-input
                  v-model="fileArray"
                  @change="previewFile(fileArray[0])"
                  chips
                  label="이미지 업로드"></v-file-input>
              </v-col>
            </v-row>

            <!-- 제출버튼 -->
            <v-row>
              <v-spacer />
              <v-col cols="12" md="4" class="ma-16">
                <v-btn block color="primary" size="x-large" @click="submit">
                  작성 완료
                </v-btn>
              </v-col>
              <v-spacer />
            </v-row>
          </v-container>
        </v-col>
        <v-spacer />
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import reviewApi from '@/api/reviewApi';
import reservApi from '@/api/reservApi';

export default {
  created() {
    reservApi
      .getReservById(this.$store.state.item.reservId)
      .then((res) => {
        this.resInfo = res.data;
        console.log('created : ', this.resInfo);
        this.startDt = this.formatDateTime(this.resInfo.startDt);
        this.endDt = this.formatDateTime(this.resInfo.endDt);
      })
      .catch((e) => {
        console.log(e);
      });
  },

  data() {
    return {
      // 출력용
      resInfo: {
        applicationDto: {
          sentence: '',
        },
      },
      preview: null,
      fileArray: [],
      startDt: '',
      endDt: '',

      // post용
      info: {
        context: [],
        star: null,
      },
      context_rules: [(v) => v.length <= 125 || '최대 125 자'],
    };
  },
  methods: {
    formatDateTime(dt) {
      // 2023-08-23T06:33:06 -> 2023년 8월 23일 6시 33분
      let date = dt.split('T')[0];
      let time = dt.split('T')[1];

      let year = date.split('-')[0];
      let month = date.split('-')[1];
      let day = date.split('-')[2];

      let apm = '오전';
      let hour;
      if (time.split(':')[0] > 12) {
        hour = time.split(':')[0] - 12;
        apm = '오후';
      } else {
        hour = time.split(':')[0];
      }
      let min = time.split(':')[1];

      return (
        year +
        '년 ' +
        month +
        '월 ' +
        day +
        '일 ' +
        apm +
        ' ' +
        hour +
        '시 ' +
        min +
        '분'
      );
    },
    previewFile(file) {
      const fileData = (data) => {
        this.preview = data;
      };
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener(
        'load',
        function () {
          fileData(reader.result);
        },
        false
      );
    },
    submit() {
      this.info.reservationId = this.$store.state.item.reservId;
      this.info.star *= 2;
      reviewApi
        .postReview(this.fileArray, this.info)
        .then((res) => {
          const newReviewId = res.data;
          this.$store.commit('setReviewId', newReviewId);
          this.$router.push('/cusInfo/reservDetail/reviewSuccess');
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
.card {
  border-top: 1px yellowgreen solid;
  border-bottom: 1px lightgrey solid;
}
</style>
