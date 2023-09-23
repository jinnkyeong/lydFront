<template>
  <v-dialog class="dialog" v-model="$store.state.just_state.open" width="800">
    <v-card color="grey_lighter">
      <v-row class="mt-16 mb-16">
        <v-spacer />
        <v-col cols="12" md="10">
          <v-container>
            <v-row class="mb-10">
              <!-- 예약 정보 요약 -->
              <v-col cols="12" md="8" class="square-box-primary pa-5">
                <v-row class="pa-4">
                  <v-col>
                    <v-img
                      :src="info.cusImgUrl"
                      aspect-ratio="1"
                      height="150px"
                      class="pa-5"
                      cover></v-img>
                  </v-col>
                  <v-col>
                    <v-row class="ml-2 mt-3 mb-3">
                      <span>
                        [{{ comDto.addrState }} {{ comDto.addrTown }}]
                      </span>
                      <span>{{ comDto.breed }}/</span>
                      <span>{{ comDto.dogAggr }}/</span>
                      <span>{{ comDto.dogHealth }}</span>
                    </v-row>
                    <v-row class="ml-2 mt-3 mb-1">
                      <span> {{ comDto.month }}월 {{ comDto.day }}일 </span>
                    </v-row>
                    <v-row class="ml-2 mt-1 mb-1">
                      <span class="mr-3">시작</span>
                      <span>
                        {{ formatTime(comDto.startHour, comDto.startMin) }}
                      </span>
                    </v-row>
                    <v-row class="ml-2 mt-1 mb-1">
                      <span class="mr-3">종료</span>
                      <span>
                        {{ formatTime(comDto.endHour, comDto.endMin) }}
                      </span>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-spacer />
              <!-- 산책 시작,종료 버튼 -->
              <v-col col="12" md="3" align-self="center">
                <div class="ma-2">
                  <span v-if="info.startDt === null && info.endDt === null">
                    <div>산책 시작 시</div>
                    <div>클릭해주세요</div>
                  </span>
                  <span v-if="info.startDt != null && info.endDt === null">
                    <div>산책 완료 시</div>
                    <div>클릭해주세요</div>
                  </span>
                  <span
                    v-if="info.startDt != null && info.endDt != null"
                    class="title-grey">
                    산책완료
                  </span>
                </div>
                <div class="ma-2">
                  <v-btn
                    v-if="info.startDt === null && info.endDt === null"
                    @click="begin"
                    variant="tonal"
                    color="secondary">
                    산책시작
                  </v-btn>
                  <v-btn
                    v-if="info.startDt != null && info.endDt === null"
                    @click="finish"
                    variant="tonal"
                    color="secondary">
                    산책완료
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <!-- 필수사항 텍스트 -->
            <v-row class="title-regular mt-16 ml-3">
              <div>필수사항</div>
            </v-row>
            <!-- 필수사항 내용 -->
            <v-row class="mt-16">
              <v-container>
                <v-row class="secondary-color semi-bold ml-1">
                  <div>고객님 댁에 방문</div>
                </v-row>
                <!-- 0 반려견과 커뮤니케이션 하기(최소 15분) -->
                <v-row>
                  <v-container class="field">
                    <v-row class="field-top">
                      <div class="field-top-label pa-7">
                        <font-awesome-icon icon="fa-solid fa-quote-left" />
                        반려견과 커뮤니케이션 하기(최소 15분)
                        <font-awesome-icon
                          icon="fa-solid fa-quote-left"
                          rotation="180" />
                        <span class="pl-2"> 을 사진으로 인증해주세요 </span>
                      </div>
                    </v-row>
                    <v-row class="field-middle">
                      <v-col>
                        <v-file-input
                          class="pa-10"
                          v-model="basicReqList[0].fileArray"
                          @change="
                            previewFile(basicReqList[0].fileArray[0], 0, 1)
                          "
                          chips
                          label="인증사진 업로드"></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row class="back-white-color">
                      <v-img
                        class="ma-5"
                        :src="previewB[0]"
                        max-width="240"
                        max-height="180"
                        aspect-ratio="4/3"
                        cover />
                    </v-row>
                  </v-container>
                </v-row>
                <!-- 1 산책줄을 올바르게 착용하기 -->
                <v-row>
                  <v-container class="field">
                    <v-row class="field-top">
                      <div class="field-top-label pa-7">
                        <font-awesome-icon icon="fa-solid fa-quote-left" />
                        산책줄을 올바르게 착용하기
                        <font-awesome-icon
                          icon="fa-solid fa-quote-left"
                          rotation="180" />
                        <span class="pl-2"> 을 사진으로 인증해주세요 </span>
                      </div>
                    </v-row>
                    <v-row class="field-middle">
                      <v-col>
                        <v-file-input
                          class="pa-10"
                          v-model="basicReqList[1].fileArray"
                          @change="
                            previewFile(basicReqList[1].fileArray[0], 1, 1)
                          "
                          chips
                          label="인증사진 업로드"></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row class="back-white-color">
                      <v-img
                        class="ma-5"
                        :src="previewB[1]"
                        max-width="240"
                        max-height="180"
                        aspect-ratio="4/3"
                        cover />
                    </v-row>
                  </v-container>
                </v-row>
                <v-row class="secondary-color semi-bold ml-1">
                  <div>산책 나가기 전</div>
                </v-row>
                <!-- 2 문 단속하기 -->
                <v-row>
                  <v-container class="field">
                    <v-row class="field-top">
                      <div class="field-top-label pa-7">
                        <font-awesome-icon icon="fa-solid fa-quote-left" />
                        문 단속하기
                        <font-awesome-icon
                          icon="fa-solid fa-quote-left"
                          rotation="180" />
                        <span class="pl-2"> 을 사진으로 인증해주세요 </span>
                      </div>
                    </v-row>
                    <v-row class="field-middle">
                      <v-col>
                        <v-file-input
                          class="pa-10"
                          v-model="basicReqList[2].fileArray"
                          @change="
                            previewFile(basicReqList[2].fileArray[0], 2, 1)
                          "
                          chips
                          label="인증사진 업로드"></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row class="back-white-color">
                      <v-img
                        class="ma-5"
                        :src="previewB[2]"
                        max-width="240"
                        max-height="180"
                        aspect-ratio="4/3"
                        cover />
                    </v-row>
                  </v-container>
                </v-row>
                <!-- 3 준비물을 모두 챙겼는지 확인하기 -->
                <v-row>
                  <v-container class="field">
                    <v-row class="field-top">
                      <div class="field-top-label pa-7">
                        <font-awesome-icon icon="fa-solid fa-quote-left" />
                        준비물을 모두 챙겼는지 확인하기
                        <font-awesome-icon
                          icon="fa-solid fa-quote-left"
                          rotation="180" />
                        <span class="pl-2"> 을 사진으로 인증해주세요 </span>
                      </div>
                    </v-row>
                    <v-row class="field-middle">
                      <v-col>
                        <v-file-input
                          class="pa-10"
                          v-model="basicReqList[3].fileArray"
                          @change="
                            previewFile(basicReqList[3].fileArray[0], 3, 1)
                          "
                          chips
                          label="인증사진 업로드"></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row class="back-white-color">
                      <v-img
                        class="ma-5"
                        :src="previewB[3]"
                        max-width="240"
                        max-height="180"
                        aspect-ratio="4/3"
                        cover />
                    </v-row>
                  </v-container>
                </v-row>
                <v-row class="secondary-color semi-bold ml-1">
                  <div>산책 중</div>
                </v-row>
                <!-- 4 고객님이 지정하신 산책로에서 산책하기 -->
                <v-row>
                  <v-container class="field">
                    <v-row class="field-top">
                      <div class="field-top-label pa-7">
                        <font-awesome-icon icon="fa-solid fa-quote-left" />
                        고객님이 지정하신 산책로에서 산책하기
                        <font-awesome-icon
                          icon="fa-solid fa-quote-left"
                          rotation="180" />
                        <span class="pl-2"> 을 사진으로 인증해주세요 </span>
                      </div>
                    </v-row>
                    <v-row class="field-middle">
                      <v-col>
                        <v-file-input
                          class="pa-10"
                          v-model="basicReqList[4].fileArray"
                          @change="
                            previewFile(basicReqList[4].fileArray[0], 4, 1)
                          "
                          chips
                          label="인증사진 업로드"></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row class="back-white-color">
                      <v-img
                        class="ma-5"
                        :src="previewB[4]"
                        max-width="240"
                        max-height="180"
                        aspect-ratio="4/3"
                        cover />
                    </v-row>
                  </v-container>
                </v-row>
                <!-- 5 반려견의 건강상태를 고려한 페이스 조절 -->
                <v-row>
                  <v-container class="field">
                    <v-row class="field-top">
                      <div class="field-top-label pa-7">
                        <font-awesome-icon icon="fa-solid fa-quote-left" />
                        반려견의 건강상태를 고려한 페이스 조절
                        <font-awesome-icon
                          icon="fa-solid fa-quote-left"
                          rotation="180" />
                        <span class="pl-2"> 을 사진으로 인증해주세요 </span>
                      </div>
                    </v-row>
                    <v-row class="field-middle">
                      <v-col>
                        <v-file-input
                          class="pa-10"
                          v-model="basicReqList[5].fileArray"
                          @change="
                            previewFile(basicReqList[5].fileArray[0], 5, 1)
                          "
                          chips
                          label="인증사진 업로드"></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row class="back-white-color">
                      <v-img
                        class="ma-5"
                        :src="previewB[5]"
                        max-width="240"
                        max-height="180"
                        aspect-ratio="4/3"
                        cover />
                    </v-row>
                  </v-container>
                </v-row>
                <!-- 6 최소 10분 간격으로 물을 마시게 하기 -->
                <v-row>
                  <v-container class="field">
                    <v-row class="field-top">
                      <div class="field-top-label pa-7">
                        <font-awesome-icon icon="fa-solid fa-quote-left" />
                        최소 10분 간격으로 물을 마시게 하기
                        <font-awesome-icon
                          icon="fa-solid fa-quote-left"
                          rotation="180" />
                        <span class="pl-2"> 을 사진으로 인증해주세요 </span>
                      </div>
                    </v-row>
                    <v-row class="field-middle">
                      <v-col>
                        <v-file-input
                          class="pa-10"
                          v-model="basicReqList[6].fileArray"
                          @change="
                            previewFile(basicReqList[6].fileArray[0], 6, 1)
                          "
                          chips
                          label="인증사진 업로드"></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row class="back-white-color">
                      <v-img
                        class="ma-5"
                        :src="previewB[6]"
                        max-width="240"
                        max-height="180"
                        aspect-ratio="4/3"
                        cover />
                    </v-row>
                  </v-container>
                </v-row>
                <v-row class="secondary-color semi-bold ml-1">
                  <div>산책 완료</div>
                </v-row>
                <!-- 7 고객님 댁으로 강아지를 데려다 주기 -->
                <v-row>
                  <v-container class="field">
                    <v-row class="field-top">
                      <div class="field-top-label pa-7">
                        <font-awesome-icon icon="fa-solid fa-quote-left" />
                        고객님 댁으로 강아지를 데려다 주기
                        <font-awesome-icon
                          icon="fa-solid fa-quote-left"
                          rotation="180" />
                        <span class="pl-2"> 을 사진으로 인증해주세요 </span>
                      </div>
                    </v-row>
                    <v-row class="field-middle">
                      <v-col>
                        <v-file-input
                          class="pa-10"
                          v-model="basicReqList[7].fileArray"
                          @change="
                            previewFile(basicReqList[7].fileArray[0], 7, 1)
                          "
                          chips
                          label="인증사진 업로드"></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row class="back-white-color">
                      <v-img
                        class="ma-5"
                        :src="previewB[7]"
                        max-width="240"
                        max-height="180"
                        aspect-ratio="4/3"
                        cover />
                    </v-row>
                  </v-container>
                </v-row>
                <!-- 8 강아지가 다쳤는지 간단히 체크하기 -->
                <v-row>
                  <v-container class="field">
                    <v-row class="field-top">
                      <div class="field-top-label pa-7">
                        <font-awesome-icon icon="fa-solid fa-quote-left" />
                        최소 10분 간격으로 물을 마시게 하기
                        <font-awesome-icon
                          icon="fa-solid fa-quote-left"
                          rotation="180" />
                        <span class="pl-2"> 을 사진으로 인증해주세요 </span>
                      </div>
                    </v-row>
                    <v-row class="field-middle">
                      <v-col>
                        <v-file-input
                          class="pa-10"
                          v-model="basicReqList[8].fileArray"
                          @change="
                            previewFile(basicReqList[8].fileArray[0], 8, 1)
                          "
                          chips
                          label="인증사진 업로드"></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row class="back-white-color">
                      <v-img
                        class="ma-5"
                        :src="previewB[8]"
                        max-width="240"
                        max-height="180"
                        aspect-ratio="4/3"
                        cover />
                    </v-row>
                  </v-container>
                </v-row>
              </v-container>
            </v-row>

            <!-- 요청사항 텍스트 -->
            <v-row class="title-regular mt-16 ml-3">
              <div>고객님의 요청사항</div>
            </v-row>
            <!-- 요청사항 내용 -->
            <v-container>
              <v-row v-for="(c, index) in cusReqList" :key="index">
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label pa-7">
                      <font-awesome-icon icon="fa-solid fa-quote-left" />
                      {{ c.context }}
                      <font-awesome-icon
                        icon="fa-solid fa-quote-left"
                        rotation="180" />
                      <span class="pl-2"> 을 사진으로 인증해주세요 </span>
                    </div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-file-input
                      class="pa-10"
                      v-model="c.fileArray"
                      @change="previewFile(c.fileArray[0], c.id, 2)"
                      chips
                      label="인증사진 업로드"></v-file-input>
                  </v-row>
                  <v-row class="back-white-color">
                    <v-img
                      v-if="!c.dirName || !c.fileName || !c.extension"
                      class="ma-5"
                      :src="previewC[c.id]"
                      max-width="240"
                      max-height="180"
                      aspect-ratio="4/3"
                      cover />
                    <v-img
                      v-if="c.dirName && c.fileName && c.extension"
                      class="ma-5"
                      :src="c.previewImgUrl"
                      max-width="240"
                      max-height="180"
                      aspect-ratio="4/3"
                      cover />
                  </v-row>
                </v-container>
              </v-row>
              <!-- 요청사항이 없는 경우 -->
              <v-row
                v-if="!cusReqList[0]"
                justify="center"
                style="height: 70px">
                <div class="mt-14 mb-16">고객님의 요청사항이 없습니다</div>
              </v-row>
            </v-container>
            <!-- 매너온도 -->
            <v-row class="title-regular mt-16 ml-3">
              <div>고객님의 매너온도</div>
            </v-row>
            <v-container>
              <v-row>
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label pa-7">
                      고객의 매너온도는 몇 점인가요?
                    </div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-slider
                      class="ma-7"
                      v-model="temperture"
                      :min="0"
                      :max="5"
                      :step="0.5"
                      color="primary"
                      thumb-label></v-slider>
                  </v-row>
                </v-container>
              </v-row>
            </v-container>
            <!-- 제출버튼 -->
            <v-row>
              <v-spacer />
              <v-col cols="12" md="4">
                <v-btn block @click="submit" color="primary">
                  <span class="white pa-10"> 산책일기 저장 </span>
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
import myInfoApi from '@/api/myInfoApi';
import reservApi from '@/api/reservApi';
import format from '@/utillFunction/format';

export default {
  created() {
    // 예약정보 출력용
    reservApi
      .getReservById(this.$store.state.item.reservId)
      .then((res) => {
        this.info = res.data;
        this.comDto = this.info.commisionDto;
        console.log('this.info: ', this.info);
        // 이미지 출력
        const urlfront = 'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
        this.info.cusImgUrl = `${urlfront}/${this.info.cusDirName}/${this.info.cusFileName}.${this.info.cusExtension}`;
        this.temperture = this.info.temperture / 2;
        console.log('this.info.temperture / 2 ', this.info.temperture / 2);
      })
      .catch((e) => {
        console.log(e);
      });

    // 필수수행사항 가져오기
    myInfoApi
      .getBasicRequiresByReservId(this.$store.state.item.reservId)
      .then((res) => {
        this.basicDatas = res.data;
        // console.log('basic : ', res.data);
        for (let i = 0; i < this.basicDatas.length; i++) {
          for (let j = 0; j < this.basicReqList.length; j++) {
            if (this.basicDatas[i].keyword == this.basicReqList[j].keyword) {
              let code = this.basicReqList[j].code;
              // 이미 작성된 이미지들 불러와서 보여주기
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              let dirName = this.basicDatas[i].dirName;
              let fileName = this.basicDatas[i].fileName;
              let extension = this.basicDatas[i].extension;
              this.previewB[
                code
              ] = `${urlfront}/${dirName}/${fileName}.${extension}`;
            }
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });

    // 고객 요청사항 가져오기(context, comId)
    myInfoApi
      .getCusRequiresByReservId(this.$store.state.item.reservId)
      .then((res) => {
        this.cusReqList = res.data;
        console.log('cus : ', res.data);
        // 이미 작성된 이미지들 불러와서 보여주기
        const urlfront = 'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
        for (let i = 0; i < this.cusReqList.length; i++) {
          let dirName = this.cusReqList[i].dirName;
          let fileName = this.cusReqList[i].fileName;
          let extension = this.cusReqList[i].extension;
          if (dirName && fileName && extension) {
            this.cusReqList[
              i
            ].previewImgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },

  data() {
    return {
      comDto: {}, // 출력용(info.commisiondto.id 하면 안나옴. 두번 거치면 안되는듯)
      info: {},
      modInfo: {}, // 수정용

      basicDatas: [], // DB에서 가져온 데이터(이미썼던것)
      basicReqList: [
        {
          code: 0,
          keyword: 'cmc',
          fileArray: '',
        },
        {
          code: 1,
          keyword: 'rop',
          fileArray: '',
        },
        {
          code: 2,
          keyword: 'dor',
          fileArray: '',
        },
        {
          code: 3,
          keyword: 'rea',
          fileArray: '',
        },
        {
          code: 4,
          keyword: 'rod',
          fileArray: '',
        },
        {
          code: 5,
          keyword: 'pac',
          fileArray: '',
        },
        {
          code: 6,
          keyword: 'rel',
          fileArray: '',
        },
        {
          code: 7,
          keyword: 'bak',
          fileArray: '',
        },
        {
          code: 8,
          keyword: 'rpb',
          fileArray: '',
        },
      ],

      temperture: 0,

      cusReqList: [],

      previewB: {}, // img src에 들어갈 file reader code
      previewC: {}, // img src에 들어갈 file reader code
    };
  },
  methods: {
    begin() {
      // 산책시작click
      // reservation 갱신
      this.modInfo.startDt = new Date();
      this.modInfo.status = 3; // 산책 중 상태
      this.modInfo.diaryStatus = 1;

      myInfoApi
        .postModify(this.$store.state.item.reservId, this.modInfo)
        .then((res) => {
          console.log(res.data);
          this.modInfo = {};
          this.$router.go(0);
        })
        .catch((e) => {
          console.log(e);
        });
      // 화면 다시 렌더링 하기 위함
      reservApi
        .getReservById(this.$store.state.item.reservId)
        .then((res) => {
          this.info = res.data;
          console.log('after : ', this.info);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    finish() {
      // 산책완료click
      // reservation 갱신

      this.modInfo.endDt = new Date();
      this.modInfo.status = 4; // 산책완료 상태
      this.modInfo.diaryStatus = 1;

      myInfoApi
        .postModify(this.$store.state.item.reservId, this.modInfo)
        .then((res) => {
          console.log(res.data);
          this.modInfo = {};
          this.$router.go(0);
        })
        .catch((e) => {
          console.log(e);
        });
      // 화면 다시 렌더링 하기 위함
      reservApi
        .getReservById(this.$store.state.item.reservId)
        .then((res) => {
          this.info = res.data;
          console.log('after : ', this.info);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    previewFile(file, rqId, rqType) {
      // rqType : 1-basic 2-cus
      // preview :{
      //   {rqId} : {file}
      // }
      const fileData = (data) => {
        if (rqType === 1) {
          this.previewB[rqId] = data;
        } else if (rqType === 2) {
          this.previewC[rqId] = data;
        } else {
          console.log('rqType 확인 필요');
        }
      };
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener(
        'load',
        function () {
          fileData(reader.result); // preview에 파일 넣어주기
        },
        false
      );
    },

    submit() {
      // basicRequire list
      let keywords = [];
      let basicFiles = [];
      for (var i = 0; i < this.basicReqList.length; i++) {
        if (this.basicReqList[i].fileArray) {
          // 채워진 이미지만 옮겨담기
          keywords.push(this.basicReqList[i].keyword);
          basicFiles.push(this.basicReqList[i].fileArray[0]);
        }
      }

      // cusRequire list
      let cusRequireIds = [];
      let cusFiles = [];
      for (let i = 0; i < this.cusReqList.length; i++) {
        if (this.cusReqList[i].fileArray) {
          // 채워진 이미지만 옮겨담기
          cusRequireIds.push(this.cusReqList[i].id);
          cusFiles.push(this.cusReqList[i].fileArray[0]);
        }
      }

      let dto = {
        reservationId: this.$store.state.item.reservId,
        keywords: keywords,
        cusRequireIds: cusRequireIds,
      };

      // 산책일지 작성일자 or 수정일자 갱신
      if (this.info.diaryCreatedAt) {
        dto.diaryUpdatedAt = new Date();
      } else {
        dto.diaryCreatedAt = new Date();
      }

      // 산책일지 완성도
      if (
        this.basicReqList.length === basicFiles.length &&
        this.cusReqList.length === cusFiles.length
      ) {
        dto.diaryStatus = 3; // complete
      } else {
        dto.diaryStatus = 2; // some
      }

      // 고객온도
      if (this.temperture) {
        dto.temperture = this.temperture * 2;
      }

      myInfoApi
        .postDiary(basicFiles, cusFiles, dto)
        .then((res) => {
          console.log(res.data);
          this.$store.commit('setOpen', false);
          this.$router.go(0);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    formatTime(h, m) {
      return format.formatTime(h, m);
    },
  },
};
</script>

<style>
.field {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 80px;
  padding-bottom: 80px;
}
.field-top {
  border-top: 1px yellowgreen solid;
  display: block;
  background-color: white;
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
  background-color: white;
}
.v-text-field {
  padding: 20px;
  background-color: white;
}
</style>
