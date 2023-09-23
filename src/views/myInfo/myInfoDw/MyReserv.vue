<template>
  <v-container>
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" md="11">
        <v-container>
          <v-row style="height: 50px"></v-row>
          <v-row>
            <div class="title">예약 내역</div>
            <!-- 의뢰서 나열 -->
          </v-row>
        </v-container>
        <v-row style="height: 100px" />
        <!-- 예약 나열 -->
        <v-container>
          <!-- tab -->
          <v-tabs v-model="tab" align-tabs="center" color="primary" fixed-tabs>
            <v-tab :value="'canceled'">
              <p>취소 완료</p>
            </v-tab>
            <v-tab :value="'reserved'">
              <p>예약 완료</p>
            </v-tab>
            <v-tab :value="'priced'">
              <p>결제 완료</p>
            </v-tab>
            <v-tab :value="'walking'">
              <p>산책 중</p>
            </v-tab>
            <v-tab :value="'walked'">
              <p>산책 완료</p>
            </v-tab>
            <v-tab :value="'calculating'">
              <p>정산 중</p>
            </v-tab>
            <v-tab :value="'calculated'">
              <p>정산 완료</p>
            </v-tab>
          </v-tabs>

          <!-- tab 선택 시 출력될 window -->
          <v-spacer style="height: 80px" />
          <v-window v-model="tab">
            <v-window-item v-for="t in tabList" :key="t" :value="t">
              <!-- 예약취소 -->
              <v-container v-if="t === 'canceled'">
                <v-container>
                  <!-- 아무것도 없는 경우 -->
                  <v-row
                    v-if="message"
                    justify="center"
                    class="list-box"
                    style="height: 300px">
                    <v-col align-self="center" cols="12" md="5">
                      <div>
                        {{ message }}
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 예약 내역이 있는 경우 -->
                  <v-row
                    justify="center"
                    v-for="rs in reservList"
                    :key="rs"
                    class="list-box">
                    <!-- 고객 이미지 -->
                    <v-col
                      cols="12"
                      md="2"
                      @click="clickImg(rs.commisionDto.commisionId)">
                      <v-img
                        v-if="rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                      <v-img
                        v-if="!rs.imgUrl"
                        src="@/assets/images/profile/profileImage.jpg"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                    </v-col>
                    <v-spacer />

                    <!-- 예약 정보 -->
                    <v-col
                      cols="12"
                      md="6"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-user" />
                        </span>
                        <span class="pr-1">
                          {{ rs.commisionDto.nick }} 고객님과의 예약
                        </span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </span>
                        <span class="pr-1">{{
                          rs.commisionDto.addrState
                        }}</span>
                        <span>{{ rs.commisionDto.addrTown }}</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        </span>
                        <span class="pr-1">{{ rs.commisionDto.month }} 월</span>
                        <span>{{ rs.commisionDto.day }} 일</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-clock" />
                        </span>
                        <span class="pr-3 secondary-color">시작</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.startHour }} 시
                        </span>
                        <span class="pr-3"
                          >{{ rs.commisionDto.startMin }} 분</span
                        >
                        <span class="pr-3 secondary-color">종료</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.endHour }} 시</span
                        >
                        <span>{{ rs.commisionDto.endMin }} 분</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-3 primary-color"> 예약날짜 </span>
                        <span class="pr-1">
                          {{ formatDateTime(rs.reservCreatedAt) }}
                        </span>
                      </div>
                    </v-col>
                    <!-- 예약상태 -->
                    <v-col
                      align-self="center"
                      cols="12"
                      md="4"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-3 text-center">
                        <div>
                          {{ formatDateTime(rs.reservCreatedAt) }}
                        </div>
                        <div>
                          <h3 class="grey title">
                            {{ formatStatus(rs.status) }}
                          </h3>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
              <!-- 예약완료 -->
              <v-container v-if="t === 'reserved'">
                <v-container>
                  <!-- 아무것도 없는 경우 -->
                  <v-row
                    justify="center"
                    v-if="message"
                    class="list-box"
                    style="height: 300px">
                    <v-col align-self="center" cols="12" md="5">
                      <div>
                        {{ message }}
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 예약 내역이 있는 경우 -->
                  <v-row
                    justify="center"
                    v-for="rs in reservList"
                    :key="rs"
                    class="list-box">
                    <!-- 고객 이미지 -->
                    <v-col
                      cols="12"
                      md="2"
                      @click="clickImg(rs.commisionDto.commisionId)">
                      <v-img
                        v-if="rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                      <v-img
                        v-if="!rs.imgUrl"
                        src="@/assets/images/profile/profileImage.jpg"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                    </v-col>
                    <v-spacer />

                    <!-- 예약 정보 -->
                    <v-col
                      cols="12"
                      md="6"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-user" />
                        </span>
                        <span class="pr-1">
                          {{ rs.commisionDto.nick }} 고객님과의 예약
                        </span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </span>
                        <span class="pr-1">{{
                          rs.commisionDto.addrState
                        }}</span>
                        <span>{{ rs.commisionDto.addrTown }}</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        </span>
                        <span class="pr-1">{{ rs.commisionDto.month }} 월</span>
                        <span>{{ rs.commisionDto.day }} 일</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-clock" />
                        </span>
                        <span class="pr-3 secondary-color">시작</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.startHour }} 시
                        </span>
                        <span class="pr-3"
                          >{{ rs.commisionDto.startMin }} 분</span
                        >
                        <span class="pr-3 secondary-color">종료</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.endHour }} 시</span
                        >
                        <span>{{ rs.commisionDto.endMin }} 분</span>
                      </div>
                    </v-col>

                    <!-- 예약상태 -->
                    <v-col
                      align-self="center"
                      cols="12"
                      md="4"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-3 text-center">
                        <div>
                          {{ formatDateTime(rs.reservCreatedAt) }}
                        </div>
                        <div>
                          <h3 class="grey title">
                            {{ formatStatus(rs.status) }}
                          </h3>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
              <!-- 결제완료 -->
              <v-container v-if="t === 'priced'">
                <v-container>
                  <!-- 아무것도 없는 경우 -->
                  <v-row
                    v-if="message"
                    justify="center"
                    class="list-box"
                    style="height: 300px">
                    <v-col align-self="center" cols="12" md="5">
                      <div>
                        {{ message }}
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 예약 내역이 있는 경우 -->
                  <v-row
                    justify="center"
                    v-for="rs in reservList"
                    :key="rs"
                    class="list-box">
                    <!-- 고객 이미지 -->
                    <v-col
                      cols="12"
                      md="2"
                      @click="clickImg(rs.commisionDto.commisionId)">
                      <v-img
                        v-if="rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                      <v-img
                        v-if="!rs.imgUrl"
                        src="@/assets/images/profile/profileImage.jpg"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                    </v-col>
                    <v-spacer />

                    <!-- 예약 정보 -->
                    <v-col
                      cols="12"
                      md="6"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-user" />
                        </span>
                        <span class="pr-1">
                          {{ rs.commisionDto.nick }} 고객님과의 예약
                        </span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </span>
                        <span class="pr-1">{{
                          rs.commisionDto.addrState
                        }}</span>
                        <span>{{ rs.commisionDto.addrTown }}</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        </span>
                        <span class="pr-1">{{ rs.commisionDto.month }} 월</span>
                        <span>{{ rs.commisionDto.day }} 일</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-clock" />
                        </span>
                        <span class="pr-3 secondary-color">시작</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.startHour }} 시
                        </span>
                        <span class="pr-3"
                          >{{ rs.commisionDto.startMin }} 분</span
                        >
                        <span class="pr-3 secondary-color">종료</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.endHour }} 시</span
                        >
                        <span>{{ rs.commisionDto.endMin }} 분</span>
                      </div>
                    </v-col>
                    <!-- 예약상태 -->
                    <v-col
                      align-self="center"
                      cols="12"
                      md="4"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-3 text-center">
                        <div>
                          {{ formatDateTime(rs.reservCreatedAt) }}
                        </div>
                        <div>
                          <h3 class="grey title">
                            {{ formatStatus(rs.status) }}
                          </h3>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
              <!-- 산책중 -->
              <v-container v-if="t === 'walking'">
                <v-container>
                  <!-- 아무것도 없는 경우 -->
                  <v-row
                    v-if="message"
                    justify="center"
                    class="list-box"
                    style="height: 300px">
                    <v-col align-self="center" cols="12" md="5">
                      <div>
                        {{ message }}
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 예약 내역이 있는 경우 -->
                  <v-row
                    justify="center"
                    v-for="rs in reservList"
                    :key="rs"
                    class="list-box">
                    <!-- 고객 이미지 -->
                    <v-col
                      cols="12"
                      md="2"
                      @click="clickImg(rs.commisionDto.commisionId)">
                      <v-img
                        v-if="rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                      <v-img
                        v-if="!rs.imgUrl"
                        src="@/assets/images/profile/profileImage.jpg"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                    </v-col>
                    <v-spacer />

                    <!-- 예약 정보 -->
                    <v-col
                      cols="12"
                      md="6"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-user" />
                        </span>
                        <span class="pr-1">
                          {{ rs.commisionDto.nick }} 고객님과의 예약
                        </span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </span>
                        <span class="pr-1">{{
                          rs.commisionDto.addrState
                        }}</span>
                        <span>{{ rs.commisionDto.addrTown }}</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        </span>
                        <span class="pr-1">{{ rs.commisionDto.month }} 월</span>
                        <span>{{ rs.commisionDto.day }} 일</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-clock" />
                        </span>
                        <span class="pr-3 secondary-color">시작</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.startHour }} 시
                        </span>
                        <span class="pr-3"
                          >{{ rs.commisionDto.startMin }} 분</span
                        >
                        <span class="pr-3 secondary-color">종료</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.endHour }} 시</span
                        >
                        <span>{{ rs.commisionDto.endMin }} 분</span>
                      </div>
                    </v-col>

                    <!-- 예약상태 -->
                    <v-col
                      align-self="center"
                      cols="12"
                      md="4"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-3 text-center">
                        <div>
                          {{ formatDateTime(rs.reservCreatedAt) }}
                        </div>
                        <div>
                          <h3 class="grey title">
                            {{ formatStatus(rs.status) }}
                          </h3>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
              <!-- 산책완료 -->
              <v-container v-if="t === 'walked'">
                <v-container>
                  <!-- 아무것도 없는 경우 -->
                  <v-row
                    v-if="message"
                    justify="center"
                    class="list-box"
                    style="height: 300px">
                    <v-col align-self="center" cols="12" md="5">
                      <div>
                        {{ message }}
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 예약 내역이 있는 경우 -->
                  <v-row
                    justify="center"
                    v-for="rs in reservList"
                    :key="rs"
                    class="list-box">
                    <!-- 고객 이미지 -->
                    <v-col
                      cols="12"
                      md="2"
                      @click="clickImg(rs.commisionDto.commisionId)">
                      <v-img
                        v-if="rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                      <v-img
                        v-if="!rs.imgUrl"
                        src="@/assets/images/profile/profileImage.jpg"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                    </v-col>
                    <v-spacer />

                    <!-- 예약 정보 -->
                    <v-col
                      cols="12"
                      md="6"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-user" />
                        </span>
                        <span class="pr-1">
                          {{ rs.commisionDto.nick }} 고객님과의 예약
                        </span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </span>
                        <span class="pr-1">{{
                          rs.commisionDto.addrState
                        }}</span>
                        <span>{{ rs.commisionDto.addrTown }}</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        </span>
                        <span class="pr-1">{{ rs.commisionDto.month }} 월</span>
                        <span>{{ rs.commisionDto.day }} 일</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-clock" />
                        </span>
                        <span class="pr-3 secondary-color">시작</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.startHour }} 시
                        </span>
                        <span class="pr-3"
                          >{{ rs.commisionDto.startMin }} 분</span
                        >
                        <span class="pr-3 secondary-color">종료</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.endHour }} 시</span
                        >
                        <span>{{ rs.commisionDto.endMin }} 분</span>
                      </div>
                    </v-col>

                    <!-- 예약상태 -->
                    <v-col
                      align-self="center"
                      cols="12"
                      md="4"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-3 text-center">
                        <div>
                          {{ formatDateTime(rs.reservCreatedAt) }}
                        </div>
                        <div>
                          <h3 class="grey title">
                            {{ formatStatus(rs.status) }}
                          </h3>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
              <!-- 정산중 -->
              <v-container v-if="t === 'calculating'">
                <v-container>
                  <!-- 아무것도 없는 경우 -->
                  <v-row
                    v-if="message"
                    justify="center"
                    class="list-box"
                    style="height: 300px">
                    <v-col align-self="center" cols="12" md="5">
                      <div>
                        {{ message }}
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 예약 내역이 있는 경우 -->
                  <v-row
                    justify="center"
                    v-for="rs in reservList"
                    :key="rs"
                    class="list-box">
                    <!-- 고객 이미지 -->
                    <v-col
                      cols="12"
                      md="2"
                      @click="clickImg(rs.commisionDto.commisionId)">
                      <v-img
                        v-if="rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                      <v-img
                        v-if="!rs.imgUrl"
                        src="@/assets/images/profile/profileImage.jpg"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                    </v-col>
                    <v-spacer />

                    <!-- 예약 정보 -->
                    <v-col
                      cols="12"
                      md="6"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-user" />
                        </span>
                        <span class="pr-1">
                          {{ rs.commisionDto.nick }} 고객님과의 예약
                        </span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </span>
                        <span class="pr-1">{{
                          rs.commisionDto.addrState
                        }}</span>
                        <span>{{ rs.commisionDto.addrTown }}</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        </span>
                        <span class="pr-1">{{ rs.commisionDto.month }} 월</span>
                        <span>{{ rs.commisionDto.day }} 일</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-clock" />
                        </span>
                        <span class="pr-3 secondary-color">시작</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.startHour }} 시
                        </span>
                        <span class="pr-3"
                          >{{ rs.commisionDto.startMin }} 분</span
                        >
                        <span class="pr-3 secondary-color">종료</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.endHour }} 시</span
                        >
                        <span>{{ rs.commisionDto.endMin }} 분</span>
                      </div>
                    </v-col>

                    <!-- 예약상태 -->
                    <v-col
                      align-self="center"
                      cols="12"
                      md="4"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-3 text-center">
                        <div>
                          {{ formatDateTime(rs.reservCreatedAt) }}
                        </div>
                        <div>
                          <h3 class="grey title">
                            {{ formatStatus(rs.status) }}
                          </h3>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
              <!-- 정산완료 -->
              <v-container v-if="t === 'calculated'">
                <v-container>
                  <!-- 아무것도 없는 경우 -->
                  <v-row
                    v-if="message"
                    justify="center"
                    class="list-box"
                    style="height: 300px">
                    <v-col align-self="center" cols="12" md="5">
                      <div>
                        {{ message }}
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 예약 내역이 있는 경우 -->
                  <v-row
                    justify="center"
                    v-for="rs in reservList"
                    :key="rs"
                    class="list-box">
                    <!-- 고객 이미지 -->
                    <v-col
                      cols="12"
                      md="2"
                      @click="clickImg(rs.commisionDto.commisionId)">
                      <v-img
                        v-if="rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                      <v-img
                        v-if="!rs.imgUrl"
                        src="@/assets/images/profile/profileImage.jpg"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                    </v-col>
                    <v-spacer />

                    <!-- 예약 정보 -->
                    <v-col
                      cols="12"
                      md="6"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-user" />
                        </span>
                        <span class="pr-1">
                          {{ rs.commisionDto.nick }} 고객님과의 예약
                        </span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </span>
                        <span class="pr-1">{{
                          rs.commisionDto.addrState
                        }}</span>
                        <span>{{ rs.commisionDto.addrTown }}</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        </span>
                        <span class="pr-1">{{ rs.commisionDto.month }} 월</span>
                        <span>{{ rs.commisionDto.day }} 일</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5 grey-little-light">
                          <font-awesome-icon icon="fa-solid fa-clock" />
                        </span>
                        <span class="pr-3 secondary-color">시작</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.startHour }} 시
                        </span>
                        <span class="pr-3"
                          >{{ rs.commisionDto.startMin }} 분</span
                        >
                        <span class="pr-3 secondary-color">종료</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.endHour }} 시</span
                        >
                        <span>{{ rs.commisionDto.endMin }} 분</span>
                      </div>
                    </v-col>

                    <!-- 예약상태 -->
                    <v-col
                      align-self="center"
                      cols="12"
                      md="4"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-3 text-center">
                        <div>
                          {{ formatDateTime(rs.reservCreatedAt) }}
                        </div>
                        <div>
                          <h3 class="grey title">
                            {{ formatStatus(rs.status) }}
                          </h3>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
            </v-window-item>
          </v-window>
        </v-container>
      </v-col>
    </v-row>
  </v-container>

  <router-view name="dialog" />
</template>

<script>
import reservApi from '@/api/reservApi';
export default {
  created() {
    reservApi
      .getReservsByDwIdAndStatus(this.$store.state.login.dwId, 1) // 첫 화면은 예약완료 상태
      .then((res) => {
        this.tab = 'reserved';
        this.reservList = res.data;
        console.log('getReservsByDwId ', this.reservList);
        // 이미지 출력
        for (let i = 0; i < this.reservList.length; i++) {
          const dirName = this.reservList[i].commisionDto.dirName;
          const fileName = this.reservList[i].commisionDto.fileName;
          const extension = this.reservList[i].commisionDto.extension;
          if (dirName && fileName && extension) {
            const urlfront =
              'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
            const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;

            this.reservList[i].imgUrl = imgUrl;
          }
        }
        // console.log('after 작업 후 : ', this.reservList);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      // tab
      tab: null,
      tabList: [
        'canceled',
        'reserved',
        'priced',
        'walking',
        'walked',
        'calculating',
        'calculated',
      ],

      reservList: [
        // {
        //   // reservationId: null,
        //   // applicationDto: {},
        //   // commisionDto: {},
        //   // status: null,
        //   // startDt: null,
        //   // endDt: null,
        //   // diaryCreatedAt: null,
        //   // diaryUpdatedAt: null,
        //   // canceledAt: null,
        //   // cancelerId: null,
        //   // cancelerUserType: null,
        //   // reservCreatedAt: null,
        // },
      ],
      message: '',
    };
  },
  methods: {
    // 날짜 포맷(2023-08-19T20:11:29 -> 2023-08-19)
    formatDateTime(dt) {
      return new Date(dt).toISOString().split('T')[0];
    },
    formatStatus(status) {
      let result;
      switch (status) {
        case 0:
          result = '취소 완료';
          break;
        case 1:
          result = '예약 완료';
          break;
        case 2:
          result = '결제 완료';
          break;
        case 3:
          result = '산책 중';
          break;
        case 4:
          result = '산책 완료';
          break;
        case 5:
          result = '정산 중';
          break;
        case 6:
          result = '정산 완료';
          break;
        default:
          break;
      }
      return result;
    },
    // 내용 clcik -> 예약 상세보기
    clickDetail(reservId) {
      this.$store.commit('setReservId', reservId);
      this.$router.push('/dwInfo/reservDetail');
    },
    // commision 이미지 click -> DetailCus로
    clickImg(comId) {
      this.$store.commit('setComId', comId);
      this.$router.push({ name: 'detailCus', query: { commisionId: comId } });
    },
  },
  watch: {
    tab() {
      let status;
      switch (this.tab) {
        case 'canceled':
          status = 0;
          break;
        case 'reserved':
          status = 1;
          break;
        case 'priced':
          status = 2;
          break;
        case 'walking':
          status = 3;
          break;
        case 'walked':
          status = 4;
          break;
        case 'calculating':
          status = 5;
          break;
        case 'calculated':
          status = 6;
          break;
        default:
          break;
      }

      reservApi
        .getReservsByDwIdAndStatus(this.$store.state.login.dwId, status)
        .then((res) => {
          this.reservList = res.data;
          console.log('getReservsByDwId ', this.reservList);
          // 이미지 출력
          for (let i = 0; i < this.reservList.length; i++) {
            const dirName = this.reservList[i].commisionDto.dirName;
            const fileName = this.reservList[i].commisionDto.fileName;
            const extension = this.reservList[i].commisionDto.extension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
              this.reservList[i].imgUrl = imgUrl;
            }
          }

          if (this.reservList.length <= 0) {
            this.message = '해당 내역이 존재하지 않습니다';
          } else {
            this.message = '';
          }
          // console.log('after 작업 후 : ', this.reservList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
