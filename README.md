# One Plate Today (오늘 한 끼)
**매 끼 뭘 먹을지 고민하는 당신에게!!**<br>
**One Plate Today**는 혼밥러들의 일상과 변화하는 외식 문화를 
반영한 음식점 검색 서비스입니다.

<img  alt='스크린샷' width="400" src="src/assets/Logo/LogoImage2.png"/>

---


**프로젝트 소개**<br>
사용자가 원하는 음식점을 쉽고 빠르게 찾을 수 있는 음식점 검색 서비스입니다.
장소 검색과 내 주변 위치 기반 탐색 기능을 통해
현재 위치 또는 특정 지역의 다양한 맛집 정보를 제공합니다.
키워드 기반 검색으로 음식 종류, 분위기, 최신 트렌드에 맞는 음식점도 손쉽게 찾을 수 있습니다.

---

**개발환경**<br>
Front-end : HTML, React, SCSS, Zustand, KakaoAPI<br>
Back-end : Express.js, KakaoAPI<br>
Database : MongoDB<br>
저장소 : Git Hub<br>
배포 환경 : Vercel

---

**주요 기능**<br>

### 1. **소셜로그인(카카오)**

### 2. **장소 및 키워드로 음식점 검색**

### 3. **현재 위치 주변 검색**

### 4. **장소 및 키워드로 음식점 검색**

### 5. **현재 위치 설정**

### 6. **음식점 상세 정보(모달)**


## **사용 기술 스택**
<p>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=black">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white">
  <img src="https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=SASS&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">
</p>


---

**트러블 슈팅**<br>
### 1. Cors 에러 : 
처음으로 서버를 개발하면서 클라이언트와 연결하는 과정에서 CORS 에러를 경험했다.
클라이언트 서버에서 백엔드 서버로 API를 요청했을 때 브라우저에 에러가 발생했고,
이는 서로 다른 출처(포트 포함) 간의 통신을 브라우저가 보안상 차단하는 정책 때문이었다.
이를 해결하기 위해 Express에 cors 미들웨어를 설치하고,

실제 내 코드

설정 이후에는 CORS 에러 없이 프론트엔드와 백엔드 간의 데이터 통신이 원활하게 이루어졌다.
이 과정을 통해 CORS의 개념과 Express에서의 처리 방식에 대해 이해할 수 있었다.

### 2. 500 Internal Server Error :
로컬 환경에서는 너무 잘 동작하다가 꼭 배포 하고 나면 500 Internal Server Error가 발생했다. 구글링을 계속 시도 했지만 서버 내부의 에러라고만 나오고 해결 방법이 각양 각색이였다.
코드를 계속 읽어 내려가면서 아무리 봐도 API쪽 에러는 아니고 DB에 문제가 있을거라 생각하여 MongDB 에러 종류를 찾아 보았다 마침 MongoDB는 외부 접속이 기본적으로 막혀 있고, 외부에서 DB 접속 클라이언트를 사용해 접속하기 위해서는 
조금 설정을 바꾸어 주어야 한다는걸 알게 되었고 MongoDB 설정에서 외부 접속을 허용 하기 위해 ip를 0.0.0.0을 설정하여 모든 외부 접속을 가능하게 하여서 해결하였다


---

**프로젝트**<br>
https://restaurant-search-mu.vercel.app






