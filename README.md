# 💗 Play, Place 💗

<div align=center>

<img src="./asset/playplace-main.png " width="800"/>

<b>함께 만드는 위치 기반 공유 플레이리스트, Play,Place</b>
</br>

<!-- ~서비스 소개글~ -->

2023.10.10 ~ 2023.11.17(6주)

</div>

## 🎧 서비스 소개 🎧

<div align=center>
<img src="./asset/메인페이지 소개.png " width="800"/>
<img src="./asset/플레이맵 소개.png " width="800"/>
<img src="./asset/플레이더 소개.png " width="800"/>
</div>

## 🎧 핵심 기능 🎧

### 스트리밍 서비스

- 음악 검색
- 재생목록 내 곡 추가, 삭제

### 위치 기반 인기 곡 플레이리스트

- 내 위치에서 가장 많이 들은 곡
- 현재 날씨에 많이 들은 곡
- 현재 시간대에 많이 들은 곡

### 랜드마크 플레이리스트

- 공유 재생 목록에 곡 추가
- 내 재생목록에 공유 재생목록 추가

### 내 주변 사용자 탐색

- 100m 반경의 사용자가 듣고 있는 곡 정보

### 챗봇 노래 추천

- 사진의 분위기 분석을 바탕으로 곡 추천

## 🎧 주요 기술 🎧

### GPS 기반 사용자 위치 추적

- 위도, 경도를 GeoCoding을 통해 읍면동으로 변환하여 위치 활용

### openAI를 이용하여 사용자가 촬영한 사진에 대한 노래 추천

- AI를 이용하여 사진의 장소, 시간대, 특징, 분위기 분석
- 장소 분석을 통한 노래 추천

### 실시간 100m 반경의 사용자 탐색

- Redis GeoSpatial을 활용하여 효율적인 거리 계산
- webSocket, Stomp를 활용하여 주기적인 위치 정보 통신
- 잦은 RDB 접근을 줄이기 위해 Redis 활용

### 위치별, 시간별, 날씨별 인기곡 조회

- 사용자들의 곡 재생 기록을 저장
- 일주일마다 Spring Scheduler를 활용해서 위치별, 시간별, 날씨별 인기곡 추출
- 추출한 노래는 mysql과 redis에 모두 저장

## 🎶 주요 화면 🎶

|                                                            |                                                              |
| :--------------------------------------------------------: | :----------------------------------------------------------: | ------------------------------------------------------ |
|    <img src="./asset/gifs/플레이맵.gif " width="300"/>     |      <img src="./asset/gifs/플레이맵.gif" width="300"/>      |
|                          플레이맵                          |                              홈                              |
|                            <!--                            |   <img src="./exec/images/식단%20페이지.PNG" width="300"/>   | <img src="./exec/images/식단%20검색.PNG" width="300"/> |
|                         식단페이지                         |                          식단 등록                           |
|     <img src="./exec/images/냉장고.PNG" width="300"/>      |    <img src="./exec/images/재료%20검색.PNG" width="300"/>    |
|                       냉장고 페이지                        |                          재료 등록                           |
| <img src="./exec/images/레시피%20페이지.PNG" width="300"/> | <img src="./exec/images/레시피%20상세보기.PNG" width="300"/> |
|                     레시피 추천 페이지                     |                       레시피 상세보기                        |
|   <img src="./exec/images/마이페이지.PNG" width="300"/>    |      <img src="./exec/images/북마크.PNG" width="300"/>       |
|                         마이페이지                         |                            북마크                            | -->                                                    |

[**> 화면 GIF 보러가기 <**](./exec/UI/UI.md)

## 🎶 시스템 아키텍쳐 🎶

<img src="./asset/시스템 아키텍쳐.png " width="800"/>

## 🎶 ERD 🎶

<img src="./asset/ERD.png " width="800"/>

## 🎶 추가 산출물🎶

<!-- - [요구사항 명세서](./exec/requirements/requirements.md)
- [와이어 프레임](./exec/wireframe/wireframe.md) -->

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

### FrontEnd

- `TypeScript` : 4.9.5
- `Next` : 18.2.0
- `Recoil`
- `Axios`
- `styled-component`
- `ESLint`
- `Prettier`
- `Android Studio`

### BackEnd

- `JAVA` : 11
- `Spring` : 2.7.0
  - `Spring Data JPA`
  - `Spring Security`
- `MySQL`
- `Redis`
- `Websocket`

### CI/CD

- `AWS EC2`
- `Jenkins`
- `Docker`
- `Amazon S3`
- `NginX`

### Tool

- `Git`
- `Jira`
- `Notion`
- `Mattermost`
- `Figma`
