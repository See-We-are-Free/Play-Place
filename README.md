# 💗 Play, Place 💗

<div align=center>

<img src="./asset/playplace-main.png " width="800"/>
</br>

### 함께 만드는 위치 기반 공유 플레이리스트, Play,Place

</br>이 카페있던 사람들은 어떤 노래를 많이 들었을까?
</br>아침 출근 길, 내 옆자리에 앉은 분은 어떤 노래를 듣고 있을까?

</br>지금 이 공간, 이 장소에 다른 사람들이 어떤 노래를 남겼는지 궁금하지 않으신가요?</br> Play,Place와 함께 위치를 매개체로 하여 다양한 방법으로 음악을 공유해보아요.

https://playplace.co.kr/

<!-- 2023.10.10 ~ 2023.11.17(6주) -->

</div>

## 🎧 서비스 소개 🎧

<div align=center>
<img src="./asset/메인페이지 소개.png " width="800"/>
<img src="./asset/플레이맵 소개.png " width="800"/>
<img src="./asset/플레이더 소개.png " width="800"/>
<img src="./asset/플로디 소개.png " width="800"/>
</div>

## 🎧 핵심 기능 🎧

### 스트리밍 서비스를 이용할 수 있어요.

- 원하는 음악을 재생하고, 앱 내에서 바로 재생할 수 있어요.
- 백그라운드 환경에서도 계속해서 재생 중인 음악을 들을 수 있어요.
- 재생 목록에 음악을 추가하거나 삭제할 수 있어요.

### 위치를 기반으로 주간 인기 곡을 추천 받을 수 있어요.

- 일주일동안 현재 위치한 <B>행정동</B>에서 가장 많이 재생된 음악 목록을 제공해요.
- 일주일동안 현재 위치한 행정동의 <B>날씨</B>에 많이 재생된 음악 목록을 제공해요.
- 일주일동안 현재 <B>시간대</B>에 많이 재생된 음악 목록을 제공해요.

### 전국의 랜드마크에 남겨진 공유 재생 목록의 음악을 들을 수 있어요.

- 반경 100m 내에 있는 랜드마크의 공유 재생 목록에 음악을 추가할 수 있어요.
- 내 재생 목록에 공유 재생 목록을 그대로 추가할 수 있어요.

### 주변 사용자들이 듣고 있는 음악 정보를 볼 수 있어요.

- 100m 반경의 위치한 사용자가 최근 들은 음악 정보를 보고, 들어볼 수 있어요.
- 개인 정보가 걱정된다면, 플레이더 기능을 끌 수도 있어요.

### 챗봇 '플로디'에게 내가 찍은 사진을 보내서 음악을 추천받을 수 있어요.

- 플로디가 내 사진의 상황과 분위기를 분석해서 키워드로 알려줘요.
- 키워드를 바탕으로 현재 들으면 좋을 음악을 추천해줘요.
- 플로디가 추천해준 음악을 따로 검색하지 않고 바로 들어볼 수 있어요.

## 🎧 주요 기술 🎧

### 네이티브 기능을 위한 하이브리드 앱 구현

- 사용자의 위치 정보를 얻어오기 위한 <b>GPS 권한</b>을 얻어왔습니다.
- 백그라운드에서도 계속 음악을 재생할 수 있도록 <b>백그라운드 재생 권한</b>을 얻어왔습니다.
- 플로디 기능에 접속하는 '흔들기' 기능을 위해 <b>가속도 센서와 진동 기능</b>을 사용했습니다.
- 플로디에게 사진을 보내기 위해 필요한 <b>카메라 권한</b>을 얻어왔습니다.

### 위치별, 시간별, 날씨별 인기곡 조회

- 일주일 동안의 사용자들의 곡 재생 기록을 MySQL에 저장합니다.
- 일주일에 한 번, Spring Scheduler를 활용하여 위치별, 시간별, 날씨별 인기곡을 추출합니다.
- 인기곡 리스트는 빠른 조회를 위해 Redis 캐시와 MySQL에 모두 저장합니다.

### 실시간으로 100m 반경에 있는 사용자 탐색

- Redis GeoSpatial을 활용하여 효율적으로 100m 반경에 있는 사용자를 탐색합니다.
- WebSocket, Stomp를 활용하여 주기적인 위치 정보 통신에 대한 오버헤드를 줄였습니다.
- 잦은 DB 접근을 줄이고 빠른 조회를 위해 Redis 캐시를 활용했습니다.

### 사진과 관련있는 음악을 추천하는 챗봇

- Google Vision을 활용하여 사진의 특징, 분위기를 분석하고, 키워드를 추출합니다.
- OpenAI가 키워드와 관련있는 음악을 추천합니다.

## 🎶 주요 화면 🎶

|                                                     |                                                  |
| :-------------------------------------------------: | :----------------------------------------------: |
| <img src="./asset/gifs/플레이맵.gif " width="300"/> | <img src="./exec/images/+버튼.PNG" width="300"/> |
|                      플레이 맵                      |                        홈                        |

## 🎶 시스템 아키텍쳐 🎶

<img src="./asset/시스템 아키텍쳐.png " width="800"/>

## 🎶 ERD 🎶

<img src="./asset/ERD.png " width="800"/>

## 🎶 추가 문서🎶

- [요구사항 명세서](https://dev-jeon.notion.site/63901bd62012421b90ee0928bf150a80?pvs=4)
- [API 명세서](https://dev-jeon.notion.site/API-18dd17c559fd496f9e500bdacd8e982d?pvs=4)
- [Play, Place 공식 문서](https://dev-jeon.notion.site/Play-Place-92dc9b8a74e14be9a460f9bc1a4f256b?pvs=4)
- [자율하는우리를봐자율해 팀 Notion](https://www.notion.so/dev-jeon/097c7a73c8c24cafaa5a9d207a487ec3?pvs=4)
- [Git Convention](https://dev-jeon.notion.site/Git-Convention-4464b76fa7e9434a99da01d2d3237a0b?pvs=4)

## 🎵 팀원 소개 🎵

<img src="./asset/팀원 소개.png " width="800"/>

<div align="center">

| [<img src = "https://avatars.githubusercontent.com/u/21137298?v=4" width = 100>](https://github.com/wjs5025) | [<img src = "https://avatars.githubusercontent.com/u/100916240?v=4" width = 100>](https://github.com/wink4u) | [<img src = "https://avatars.githubusercontent.com/u/77854486?v=4" width = 100>](https://github.com/Im-hass) |
| :----------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: |
|                                                    전인혁                                                    |                                                    김승현                                                    |                                                    임희선                                                    |
|                                                   FE, 팀장                                                   |                                                      FE                                                      |                                                      FE                                                      |

| [<img src = "https://avatars.githubusercontent.com/u/82308415?v=4" width = 100>](https://github.com/byunyc0124) | [<img src = "https://avatars.githubusercontent.com/u/90020798?v=4" width = 100>](https://github.com/jjoyra) | [<img src = "https://avatars.githubusercontent.com/u/107923409?v=4" width = 100>](https://github.com/SeungJun) |
| :-------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: |
|                                                     변영채                                                      |                                                   조희라                                                    |                                                     홍승준                                                     |
|                                                       BE                                                        |                                                     BE                                                      |                                                       BE                                                       |

</div>

## 🎵 사용 기술🎵

<b> FrontEnd | </b> `TypeScript`, `Next`, `Recoil`, `Axios`, `styled-component`, `ESLint`, `Prettier`, `Android Studio`

<b> BackEnd | </b> `JAVA`, `Spring`, `Spring Data JPA`, `Spring Security`, `Spring Scheduler`, `MySQL`, `Redis`, `Websocket`

<b> CI/CD | </b> `AWS EC2`, `Jenkins`, `Docker`, `Amazon S3`, `Nginx`

<b>Tool | </b> `Git`, `Jira`, `Notion`, `Mattermost`, `Figma`
