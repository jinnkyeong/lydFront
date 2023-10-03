<template>
  <v-dialog class="dialog" v-model="$store.state.just_state.open" width="700">
    <v-card>
      <v-row class="mt-16 mb-16">
        <v-spacer />
        <v-col cols="12" md="10">
          <v-container>
            <!-- 예약 정보 요약 -->

            <v-row>
              <v-col>
                <v-container>
                  <!-- <v-divider thickness="3" /> -->
                  <v-row class="pa-5 square-box">
                    <!-- 도그워커 사진 -->
                    <v-col cols="12" md="3" align-self="center">
                      <v-img
                        :src="info.imgUrl"
                        aspect-ratio="1"
                        height="100px"
                        cover></v-img>
                    </v-col>
                    <v-col cols="12" md="1" />

                    <v-col cols="12" md="5" align-self="center">
                      <!-- 날짜 -->
                      <v-row>
                        <div class="mt-2 mb-2">
                          {{ formatDate(info.startDt) }}
                        </div>
                      </v-row>
                      <!-- {{ typeof d.startDt }} -->
                      <!-- 시간 -->
                      <v-row>
                        <span class="mr-2 secondary-color">시작</span>
                        <span class="black">
                          {{ formatDTtoTime(info.startDt) }}
                        </span>
                      </v-row>
                      <v-row>
                        <span class="mr-2 secondary-color">종료</span>
                        <span class="black">
                          {{ formatDTtoTime(info.endDt) }}
                        </span>
                      </v-row>
                    </v-col>
                    <v-col cols="12" md="3" align-self="center">
                      <h3 class="grey">
                        {{ info.diaryStatus === 2 ? '작성 중' : '작성 완료' }}
                      </h3>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <!-- 최종수정일 -->
            <v-row no-gutters justify="end">
              <div class="text-micro grey-little-light mb-10">
                최종수정 {{ finalUpdateDt }}
              </div>
            </v-row>
            <!-- 요구사항 -->
            <v-row>
              <div class="mb-5 ml-5 mr-5 mt-16 secondary-color semi-bold">
                기본 수행사항
              </div>
            </v-row>

            <v-row>
              <v-timeline v-for="(req, index) in basicReqList" :key="index">
                <v-timeline-item dot-color="primary">
                  <!-- cate(left) -->
                  <!-- <template v-slot:opposite>
                    <span>{{ typeConvert(req.typeEssential) }}</span>
                  </template> -->
                  <!-- require, img(right) -->

                  <v-card
                    class="elevation-2 ma-3 pa-3"
                    style="min-width: 150px; border-radius: 15px">
                    <v-card-item>
                      <v-row>
                        <v-col cols="12" md="7" align-self="center">
                          <v-card-subtitle color="primary">
                            {{ typeConvert(req.typeEssential) }}
                          </v-card-subtitle>
                          <span>
                            {{ req.context }}
                          </span>
                        </v-col>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="ma-3">
                            <v-img
                              :src="req.imgUrl"
                              width="100"
                              height="100"
                              style="border-radius: 15px"
                              cover />
                          </span>
                        </v-col>
                      </v-row>
                    </v-card-item>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
              <v-container v-if="basicNullMsg">
                <v-row justify="center">
                  <div class="grey">{{ basicNullMsg }}</div>
                </v-row>
              </v-container>
            </v-row>
            <!-- 요청사항 -->
            <v-row>
              <div class="mb-5 ml-5 mr-5 mt-16 secondary-color semi-bold">
                고객님의 요청사항
              </div>
            </v-row>
            <v-row>
              <v-timeline v-for="(req, index) in cusReqList" :key="index">
                <v-timeline-item dot-color="primary">
                  <!-- cate(left) -->
                  <!-- <template v-slot:opposite>
                    <span>{{ typeConvert(req.typeEssential) }}</span>
                  </template> -->
                  <!-- require, img(right) -->
                  <v-card
                    class="elevation-2 ma-3 pa-3"
                    style="min-width: 500px; border-radius: 15px">
                    <v-card-item>
                      <v-row>
                        <v-col cols="12" md="6" align-self="center">
                          <span>
                            {{ req.context }}
                          </span>
                        </v-col>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span>
                            <v-img
                              :src="req.imgUrl"
                              width="200"
                              height="100"
                              style="border-radius: 15px"
                              cover />
                          </span>
                        </v-col>
                      </v-row>
                    </v-card-item>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
              <v-container v-if="cusNullMsg">
                <v-row justify="center">
                  <div class="grey">{{ cusNullMsg }}</div>
                </v-row>
              </v-container>
            </v-row>
            <v-spacer style="height: 100px" />

            <!-- 닫기버튼 -->
            <v-row>
              <v-spacer />
              <v-col cols="12" md="4">
                <v-btn
                  size="large"
                  color="grey"
                  value="tonal"
                  block
                  @click="close"
                  >닫기</v-btn
                >
              </v-col>
              <v-spacer />
            </v-row>
            <v-spacer style="height: 50px" />
          </v-container>
        </v-col>
        <v-spacer />
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import format from '@/utillFunction/format';
import myInfoApi from '@/api/myInfoApi';
import reservApi from '@/api/reservApi';

export default {
  created() {
    reservApi
      .getReservById(this.$store.state.item.reservId)
      .then((res) => {
        this.info = res.data;
        console.log('created : ', this.info);
        // 예약자 이미지
        const dirName = this.info.dwDirName;
        const fileName = this.info.dwFileName;
        const extension = this.info.dwExtension;
        if (dirName && fileName && extension) {
          const urlfront =
            'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
          const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;

          this.info.imgUrl = imgUrl;
        }
        // 수정일자
        if (this.info.diaryUpdatedAt) {
          this.finalUpdateDt = this.formatDateTime(this.info.diaryUpdatedAt);
        } else if (this.info.diaryCreatedAt) {
          this.finalUpdateDt = this.formatDateTime(this.info.diaryCreatedAt);
        } else {
          console.log('diaryUpdatedAt,diaryCreatedAt null!!');
        }
      })
      .catch((e) => {
        console.log(e);
      });

    myInfoApi
      .getBasicRequiresByReservId(this.$store.state.item.reservId)
      .then((res) => {
        console.log('getBasicRequiresByReservId : ', res.data);
        this.basicReqList = res.data;
        // for (let i = 0; i < res.data.length; i++) {
        //   if (res.data[i].typeEssential === 1) {
        //     this.firstList.push(res.data[i]);
        //   } else if (res.data[i].typeEssential === 2) {
        //     this.secondList.push(res.data[i]);
        //   } else if (res.data[i].typeEssential === 3) {
        //     this.thirdList.push(res.data[i]);
        //   } else if (res.data[i].typeEssential === 4) {
        //     this.fourthList.push(res.data[i]);
        //   }
        // }
        if (this.basicReqList.length < 1) {
          this.basicNullMsg = '해당 수행사항은 작성 전입니다';
        }
        // 이미지 출력
        for (let i = 0; i < this.basicReqList.length; i++) {
          const dirName = this.basicReqList[i].dirName;
          const fileName = this.basicReqList[i].fileName;
          const extension = this.basicReqList[i].extension;
          if (dirName && fileName && extension) {
            const urlfront =
              'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
            const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
            this.basicReqList[i].imgUrl = imgUrl;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });

    myInfoApi
      .getCusRequiresByReservId(this.$store.state.item.reservId)
      .then((res) => {
        console.log('getCusRequiresByReservId : ', res.data);
        this.cusReqList = res.data;
        if (this.cusReqList.length < 1) {
          this.cusNullMsg = '해당 수행사항은 작성 전입니다';
        }
        // 이미지 출력
        for (let i = 0; i < this.cusReqList.length; i++) {
          const dirName = this.cusReqList[i].dirName;
          const fileName = this.cusReqList[i].fileName;
          const extension = this.cusReqList[i].extension;
          if (dirName && fileName && extension) {
            const urlfront =
              'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
            const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;

            this.cusReqList[i].imgUrl = imgUrl;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },

  data() {
    return {
      info: {}, // 제출용
      modInfo: {}, // 수정용

      // 1: 방문 시 2: 산책 전 3: 산책 중 4: 산책 완료
      firstList: [],
      secondList: [],
      thirdList: [],
      fourthList: [],

      temperture: 0,

      basicReqList: [],
      cusReqList: [],

      fileArray: '', // file Array Object를 받음
      previewC: {}, // img src에 들어갈 file reader code
      previewB: {}, // img src에 들어갈 file reader code
      // preview {
      //   1:url1,
      //   2:url2
      // }
      finalUpdateDt: '',
      basicNullMsg: '',
      cusNullMsg: '',
    };
  },
  methods: {
    typeConvert(type) {
      if (type) {
        switch (type) {
          case 1:
            return '고객님 댁에 방문';
          case 2:
            return '산책 나가기 전';
          case 3:
            return '산책 중';
          case 4:
            return '산책 완료';
          default:
            break;
        }
      }
    },
    close() {
      this.$store.commit('setOpen', false);
    },
    formatDTtoTime(dt) {
      if (dt) {
        return format.formatDTtoTime(dt);
      }
    },
    formatDate(dt) {
      if (dt) {
        return format.formatDate(dt);
      }
    },
    formatDateTime(dt) {
      if (dt) {
        return format.formatDateTime(dt);
      }
    },
  },
};
</script>

<style>
.cate {
  color: aqua;
}
.type {
  color: blue;
}
.field {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 80px;
  padding-bottom: 80px;
}
.field-top {
  border-top: 1px yellowgreen solid;
  display: block;
}
.field-top-label {
  padding: 10px;
  font-size: var(--font-regular);
  font-weight: var(--weight-regular);
}
.field-top-desc {
  padding: 5px;
}
.field-middle {
  border-top: 1px grey solid;
}
.v-text-field {
  padding: 20px;
}
</style>
