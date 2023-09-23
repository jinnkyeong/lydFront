<template>
  <v-container>
    <!-- 제목 -->
    <v-row class="pl-10 pt-10 mt-10 pb-16 mb-16">
      <v-col cols="12" md="4">
        <div class="left-title">
          <h3>예약 상세보기</h3>
        </div>
      </v-col>
    </v-row>

    <!-- 예약 나열 -->
    <v-row class="pt-3 mt-3">
      <v-spacer />

      <v-col cols="12" md="8">
        <!-- 예약 취소 -->
        <v-container v-if="this.info.status === 0">
          <v-spacer />
          <v-row class="ma-10" justify="center">
            <v-card width="800px" class="pa-4" color="blue_light">
              <div
                class="ma-5 pt-4 text-regular semi-bold text-center text-center">
                해당 예약은 취소되었습니다
              </div>
              <div></div>
              <div>
                <!-- 예약정보 -->
                <v-row>
                  <v-spacer />
                  <v-col cols="12" md="8">
                    <v-container>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">도그워커 닉네임</span>
                        </v-col>
                        <v-spacer />

                        <v-col cols="12" md="4">{{
                          info.applicationDto.nick
                        }}</v-col>
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">고객 닉네임</span>
                        </v-col>
                        <v-spacer />

                        <v-col cols="12" md="4">{{
                          info.commisionDto.nick
                        }}</v-col>
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">산책 예정 일자</span>
                        </v-col>
                        <v-spacer />

                        <v-col cols="12" md="4">
                          {{ info.commisionDto.month }}월
                          {{ info.commisionDto.month }}일
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">시작 시간</span>
                        </v-col>
                        <v-spacer />

                        <v-col cols="12" md="4">
                          {{
                            formatTime(
                              info.commisionDto.startHour,
                              info.commisionDto.startMin
                            )
                          }}
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">종료 시간</span>
                        </v-col>
                        <v-spacer />

                        <v-col cols="12" md="4">
                          {{
                            formatTime(
                              info.commisionDto.endHour,
                              info.commisionDto.endMin
                            )
                          }}
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">고객 주소</span>
                        </v-col>
                        <v-spacer />

                        <v-col cols="12" md="4">
                          {{ info.commisionDto.addrState }}
                          {{ info.commisionDto.addrTown }}
                          {{ info.commisionDto.addrDetail }}
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">최종 시간당 가격</span>
                        </v-col>
                        <v-spacer />

                        <v-col cols="12" md="4">{{ info.price }} 원</v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-spacer />
                </v-row>
                <!-- 취소정보 -->
                <v-row class="ma-7" no-gutters justify="center">
                  <div>
                    <div class="text-regular mr-3">취소일자</div>
                    <div class="text-regular">
                      {{ formatDateTime(info.canceledAt) }}
                    </div>
                  </div>
                  <!-- <div>
                    <div class="text-regular mr-3">취소자</div>
                    <div class="text-regular">
                      {{ formatDateTime(info.canceledAt) }}
                    </div>
                    <span class="">
                      {{ formatCancelerUserType(info.cancelerUserType) }}
                    </span>
                    <span class="">
                      {{ formatCancelerNick(info.cancelerUserType) }}sd
                    </span>
                  </div> -->
                </v-row>
              </div>
            </v-card>
          </v-row>
          <v-spacer />
        </v-container>

        <!-- 예약완료 -->
        <v-container v-if="this.info.status === 1">
          <v-spacer />
          <v-row class="ma-10" justify="center">
            <v-card width="800px" class="pa-4" color="blue_light">
              <div class="ma-5 pt-4 pb-4 text-regular semi-bold text-center">
                예약이 완료되었습니다. 고객님의 결제를 기다리고 있습니다.
              </div>
              <div>
                <!-- 예약정보 -->
                <v-row>
                  <v-spacer />
                  <v-col cols="12" md="8">
                    <v-container>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">도그워커 닉네임</span>
                        </v-col>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          {{ info.applicationDto.nick }}
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">고객 닉네임</span>
                        </v-col>
                        <v-spacer />

                        <v-col cols="12" md="4">{{
                          info.commisionDto.nick
                        }}</v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">산책 예정 일자</span>
                        </v-col>
                        <v-spacer />

                        <v-col cols="12" md="4">
                          {{ info.commisionDto.month }}월
                          {{ info.commisionDto.month }}일
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">시작 시간</span>
                        </v-col>
                        <v-spacer />

                        <v-col cols="12" md="4">
                          {{
                            formatTime(
                              info.commisionDto.startHour,
                              info.commisionDto.startMin
                            )
                          }}
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">종료시간</span>
                        </v-col>
                        <v-spacer />

                        <v-col cols="12" md="4">
                          {{
                            formatTime(
                              info.commisionDto.endHour,
                              info.commisionDto.endMin
                            )
                          }}
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">고객주소</span>
                        </v-col>
                        <v-spacer />

                        <v-col cols="12" md="4">
                          {{ info.commisionDto.addrState }}
                          {{ info.commisionDto.addrTown }}
                          {{ info.commisionDto.addrDetail }}
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">최종 시간당 가격</span>
                        </v-col>
                        <v-spacer />

                        <v-col cols="12" md="4">{{ info.price }} 원</v-col>
                        <v-spacer />
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-spacer />
                </v-row>
                <!-- 취소정보 -->
                <v-row class="ma-7" no-gutters justify="center">
                  <div class="text-regular mr-3">예약일자</div>
                  <div class="text-regular">
                    {{ formatDateTime(info.reservCreatedAt) }}
                  </div>
                </v-row>
              </div>
            </v-card>
          </v-row>
          <v-spacer />
        </v-container>

        <v-container v-if="this.info.status === 2">
          <v-spacer />
          <v-row class="ma-10" justify="center">
            <v-card width="800px" class="pa-4" color="blue_light">
              <div class="ma-5 pt-4 text-regular semi-bold text-center">
                <div>고객님의 결제가 완료되었습니다.</div>
                <div>산책 일시에 맞춰 산책을 완료 해 주세요</div>
              </div>
              <div class="ma-10 desc">
                <div>
                  산책은 예약된 산책일시에 고객님 댁에 도착하여 산책시작 버튼을
                  누르는 시점에 시작되며,
                </div>
                <div>
                  산책 후 강아지를 고객님 댁으로 데려다 준 후 산책 종료 버튼을
                  누르는 시점에 종료됩니다.
                </div>
                <div>
                  산책시작 및 종료 버튼은 산책일지에서 찾을 수 있습니다.
                </div>
              </div>
              <div>
                <!-- 예약정보 -->
                <v-row>
                  <v-spacer />
                  <v-col cols="12" md="8">
                    <v-container>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">도그워커 닉네임</span>
                        </v-col>
                        <v-col cols="12" md="4">{{
                          info.applicationDto.nick
                        }}</v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">고객 닉네임</span>
                        </v-col>
                        <v-col cols="12" md="4">{{
                          info.commisionDto.nick
                        }}</v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">산책 예정 일자</span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{ info.commisionDto.month }}월
                          {{ info.commisionDto.month }}일
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">시작 시간</span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{
                            formatTime(
                              info.commisionDto.startHour,
                              info.commisionDto.startMin
                            )
                          }}
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">종료시간</span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{
                            formatTime(
                              info.commisionDto.endHour,
                              info.commisionDto.endMin
                            )
                          }}
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">고객주소</span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{ info.commisionDto.addrState }}
                          {{ info.commisionDto.addrTown }}
                          {{ info.commisionDto.addrDetail }}
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">최종 시간당 가격</span>
                        </v-col>
                        <v-col cols="12" md="4">{{ info.price }} 원</v-col>
                        <v-spacer />
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-spacer />
                </v-row>
                <!-- 산책일지 작성 -->
                <v-row class="ma-8">
                  <v-col align-self="center" cols="12" md="4">
                    <v-btn @click="writeDiary" color="primary" size="x-large">
                      <span v-if="info.diaryStatus === 1">산책일지 작성</span>
                      <span
                        v-if="info.diaryStatus === 2 || info.diaryStatus === 3">
                        산책일지 수정
                      </span>
                    </v-btn>
                  </v-col>
                  <v-col align-self="center" cols="12" md="8">
                    <span v-if="info.diaryStatus === 1" class="">
                      지금 바로 산책일지를 작성할 수 있습니다
                    </span>
                    <!-- <span v-if="info.diaryStatus === 2" class="">
                      모든 요구사항에 대하여 인증사진을 첨부하여 일지 작성을
                      완료해주세요
                    </span> -->
                    <span
                      v-if="info.diaryStatus === 2"
                      class="secondary-color title-regular">
                      <span class="mr-2">산책일지 작성을 완료했습니다</span>
                      <span>{{
                        info.diaryUpdatedAt
                          ? formatDateTime(info.diaryUpdatedAt)
                          : formatDateTime(info.diaryCreatedAt)
                      }}</span>
                    </span>
                  </v-col>
                </v-row>
              </div>
              <v-spacer style="height: 50px" />
            </v-card>
          </v-row>
          <v-spacer />
        </v-container>

        <v-container v-if="this.info.status === 3">
          <v-spacer />
          <v-row class="ma-10" justify="center">
            <v-card width="800px" class="pa-4" color="blue_light">
              <div class="ma-5 pt-4 pb-4 text-regular semi-bold text-center">
                산책 수행 중입니다
              </div>
              <div class="ma-10 desc">
                <div>산책 중 및 산책 후 산책일지를 작성해주세요.</div>
                <div>
                  <span class="highlight">산책 종료 후 1일 이내</span>에
                  산책일지 작성을 완료해야만 정산 시
                </div>
                <div>불이익을 받지 않습니다.</div>
                <div>
                  모든 수행사항에 대하여 인증사진을 첨부해야만 산책일지 작성
                  완료로 인정됩니다.
                </div>
              </div>
              <div>
                <!-- 예약정보 -->
                <v-row>
                  <v-spacer />
                  <v-col cols="12" md="8">
                    <v-container>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">도그워커 닉네임</span>
                        </v-col>
                        <v-col cols="12" md="4">{{
                          info.applicationDto.nick
                        }}</v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">고객 닉네임</span>
                        </v-col>
                        <v-col cols="12" md="4">{{
                          info.commisionDto.nick
                        }}</v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">산책 예정 일자</span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{ info.commisionDto.month }}월
                          {{ info.commisionDto.month }}일
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">시작 시간</span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{
                            formatTime(
                              info.commisionDto.startHour,
                              info.commisionDto.startMin
                            )
                          }}
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">종료시간</span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{
                            formatTime(
                              info.commisionDto.endHour,
                              info.commisionDto.endMin
                            )
                          }}
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">고객주소</span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{ info.commisionDto.addrState }}
                          {{ info.commisionDto.addrTown }}
                          {{ info.commisionDto.addrDetail }}
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">최종 시간당 가격</span>
                        </v-col>
                        <v-col cols="12" md="4">{{ info.price }} 원</v-col>
                        <v-spacer />
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-spacer />
                </v-row>
                <!-- 산책일지 작성 -->
                <v-row class="ma-8">
                  <v-col align-self="center" cols="12" md="4">
                    <v-btn @click="writeDiary" color="primary" size="x-large">
                      <span v-if="info.diaryStatus === 1">산책일지 작성</span>
                      <span
                        v-if="info.diaryStatus === 2 || info.diaryStatus === 3">
                        산책일지 수정
                      </span>
                    </v-btn>
                  </v-col>
                  <v-col align-self="center" cols="12" md="8">
                    <span v-if="info.diaryStatus === 1" class="">
                      지금 바로 산책일지를 작성할 수 있습니다
                    </span>
                    <!-- <span v-if="info.diaryStatus === 2" class="">
                      모든 요구사항에 대하여 인증사진을 첨부하여 일지 작성을
                      완료해주세요
                    </span> -->
                    <span
                      v-if="info.diaryStatus === 2"
                      class="secondary-color title-regular">
                      <span class="mr-2">산책일지 작성을 완료했습니다</span>
                      <span>{{
                        info.diaryUpdatedAt
                          ? formatDateTime(info.diaryUpdatedAt)
                          : formatDateTime(info.diaryCreatedAt)
                      }}</span>
                    </span>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-row>
          <v-spacer />
        </v-container>

        <v-container v-if="this.info.status === 4">
          <v-spacer />
          <v-row class="ma-10" justify="center">
            <v-card width="800px" class="pa-4" color="blue_light">
              <div class="ma-5 pt-4 pb-4 text-regular semi-bold text-center">
                산책이 완료되었습니다.
              </div>
              <div>
                <!-- 예약정보 -->
                <v-row>
                  <v-spacer />
                  <v-col cols="12" md="8">
                    <v-container>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">도그워커 닉네임</span>
                        </v-col>
                        <v-col cols="12" md="4">{{
                          info.applicationDto.nick
                        }}</v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">고객 닉네임</span>
                        </v-col>
                        <v-col cols="12" md="4">{{
                          info.commisionDto.nick
                        }}</v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">산책 예약 일자</span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{ info.commisionDto.month }}월
                          {{ info.commisionDto.month }}일
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">시작 시간</span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{
                            formatTime(
                              info.commisionDto.startHour,
                              info.commisionDto.startMin
                            )
                          }}
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">종료시간</span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{
                            formatTime(
                              info.commisionDto.endHour,
                              info.commisionDto.endMin
                            )
                          }}
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">고객주소</span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{ info.commisionDto.addrState }}
                          {{ info.commisionDto.addrTown }}
                          {{ info.commisionDto.addrDetail }}
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">최종 시간당 가격</span>
                        </v-col>
                        <v-col cols="12" md="4">{{ info.price }} 원</v-col>
                        <v-spacer />
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-spacer />
                </v-row>
                <!-- 산책일지 작성 -->
                <v-row class="ma-8">
                  <v-col align-self="center" cols="12" md="4">
                    <v-btn @click="writeDiary" color="primary" size="x-large">
                      <span v-if="info.diaryStatus === 1">산책일지 작성</span>
                      <span
                        v-if="info.diaryStatus === 2 || info.diaryStatus === 3">
                        산책일지 수정
                      </span>
                    </v-btn>
                  </v-col>
                  <v-col align-self="center" cols="12" md="8">
                    <span v-if="info.diaryStatus === 1" class="">
                      지금 바로 산책일지를 작성할 수 있습니다
                    </span>
                    <!-- <span v-if="info.diaryStatus === 2" class="">
                      모든 요구사항에 대하여 인증사진을 첨부하여 일지 작성을
                      완료해주세요
                    </span> -->
                    <span
                      v-if="info.diaryStatus === 2"
                      class="secondary-color title-regular">
                      <span class="mr-2">산책일지 작성을 완료했습니다</span>
                      <span>{{
                        info.diaryUpdatedAt
                          ? formatDateTime(info.diaryUpdatedAt)
                          : formatDateTime(info.diaryCreatedAt)
                      }}</span>
                    </span>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-row>
          <v-spacer />
        </v-container>

        <v-container v-if="this.info.status === 5">
          <v-spacer />
          <v-row class="ma-10" justify="center">
            <v-card width="800px" class="pa-4" color="blue_light">
              <div class="ma-5 pt-4 pb-4 text-regular semi-bold text-center">
                정산 중 입니다. 산책 후 7일 이내 정산이 완료됩니다.
              </div>
              <div>
                <!-- 예약정보 -->
                <v-row>
                  <v-spacer />
                  <v-col cols="12" md="8">
                    <v-container>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">도그워커 닉네임</span>
                        </v-col>
                        <v-col cols="12" md="4">{{
                          info.applicationDto.nick
                        }}</v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">산책 날짜</span>
                        </v-col>
                        <v-col cols="12" md="4">{{
                          formatDateTime(info.startDt)
                        }}</v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />

                        <v-col cols="12" md="4">
                          <span class="label"> 입금 예정 계좌 </span>
                        </v-col>
                        <v-col cols="12" md="4">
                          <span>
                            <!-- {{ info.applicationDto.depositBank }} -->
                            신한은행
                          </span>
                          <span>
                            <!-- {{ info.applicationDto.depositAccount }} -->
                            57894375894378594
                          </span>
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label"> 총 입금 금액 </span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{ totalPrice(info.price, info.startDt, info.endDt) }}
                          원
                        </v-col>
                        <v-spacer />
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-spacer />
                </v-row>
                <v-spacer style="height: 100px" />
              </div>
            </v-card>
          </v-row>
          <v-spacer />
        </v-container>

        <v-container v-if="this.info.status === 6">
          <v-spacer />
          <v-row class="ma-10" justify="center">
            <v-card width="800px" class="pa-4" color="blue_light">
              <div class="ma-5 pt-4 pb-4 text-regular semi-bold text-center">
                정산이 완료되었습니다.
              </div>
              <div>
                <!-- 예약정보 -->
                <v-row>
                  <v-spacer />
                  <v-col cols="12" md="8">
                    <v-container>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">도그워커 닉네임</span>
                        </v-col>
                        <v-col cols="12" md="4">{{
                          info.applicationDto.nick
                        }}</v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label">산책 날짜</span>
                        </v-col>
                        <v-col cols="12" md="4">{{
                          formatDateTime(info.startDt)
                        }}</v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />

                        <v-col cols="12" md="4">
                          <span class="label"> 입금 계좌 </span>
                        </v-col>
                        <v-col cols="12" md="4">
                          <span>
                            <!-- {{ info.applicationDto.depositBank }} -->
                            신한은행
                          </span>
                          <span>
                            <!-- {{ info.applicationDto.depositAccount }} -->
                            57894375894378594
                          </span>
                        </v-col>
                        <v-spacer />
                      </v-row>
                      <v-row>
                        <v-spacer />
                        <v-col cols="12" md="4">
                          <span class="label"> 총 입금 금액 </span>
                        </v-col>
                        <v-col cols="12" md="4">
                          {{ totalPrice(info.price, info.startDt, info.endDt) }}
                          원
                        </v-col>
                        <v-spacer />
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-spacer />
                </v-row>
                <v-spacer style="height: 100px" />

                <!-- 산책일지 작성 -->
                <!-- <v-row class="ma-8">
                  <v-col align-self="center" cols="12" md="4">
                    <v-btn @click="writeDiary">
                      <span v-if="info.diaryStatus === 1"
                        >(처음)산책일지 작성</span
                      >
                      <span
                        v-if="info.diaryStatus === 2 || info.diaryStatus === 3"
                        >(손댄경우)산책일지 수정</span
                      >
                    </v-btn>
                  </v-col>
                  <v-col align-self="center" cols="12" md="9">
                    <span v-if="info.diaryStatus === 1" class="">
                      지금 바로 산책일지를 작성할 수 있습니다
                    </span>
                    <span v-if="info.diaryStatus === 2" class="">
                      모든 요구사항에 대하여 인증사진을 첨부하여 일지 작성을
                      완료해주세요
                    </span>
                    <span v-if="info.diaryStatus === 2" class="">
                      <span>산책일지 작성을 완료했습니다</span>
                      <span>{{
                        info.diaryUpdatedAt
                          ? formatDateTime(info.diaryUpdatedAt)
                          : formatDateTime(info.diaryCreatedAt)
                      }}</span>
                    </span>
                  </v-col>
                </v-row> -->
              </div>
            </v-card>
          </v-row>
          <v-spacer />
        </v-container>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
  <router-view name="dialog" />
</template>

<script>
import reservApi from '@/api/reservApi';
import format from '@/utillFunction/format';
export default {
  created() {
    reservApi
      .getReservById(this.$store.state.item.reservId)
      .then((res) => {
        this.info = res.data;
        console.log('getReservById ', this.info);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      info: {},
    };
  },
  methods: {
    // 날짜 포맷(2023-08-19T20:11:29 -> 2023-08-19)
    formatDateTime(dt) {
      return new Date(dt).toISOString().split('T')[0];
    },
    formatCancelerUserType(type) {
      return type === 'dogwalker' ? '도그워커 ' : '고객 ';
    },
    formatCancelerNick(type) {
      if (type === 'dogwalker') {
        return this.info.applicationDto.nick;
      } else {
        return this.info.commisionDto.nick;
      }
    },
    formatTime(hour, min) {
      return format.formatTime(hour, min);
    },

    // 산책일지 쓰러 가기
    writeDiary(reservId) {
      this.$store.commit('setOpen', true);
      this.$store.commit('setReservId', this.$store.state.item.reservId); //혹시몰라서 다시 저장
      this.$router.push('/dwInfo/reservDetail/diaryManual');
    },
    // 총가격 = 시간당가격 * 산책시간
    totalPrice(price, start, end) {
      let tot;
      if (price && start && end) {
        const diffMSec = new Date(end).getTime() - new Date(start).getTime(); // iso string -> date
        // console.log('1 : ', diffMSec);
        const diffHour = diffMSec / (60 * 60 * 1000);
        // console.log('2 : ', diffHour);
        const leftMin = (diffMSec % (60 * 60 * 1000)) / (60 * 1000);
        // console.log('3 : ', leftMin);
        tot = price * diffHour + price * (leftMin / 60).toFixed(1);

        // console.log('4 : ', tot);
      } else {
        console.log('가격,시작끝날짜 안들어옴');
      }

      return tot;
    },
  },
};
</script>

<style></style>
