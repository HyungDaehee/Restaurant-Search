## One Plate Today (오늘 한 끼)
**매 끼 뭘 먹을지 고민하는 당신에게!!**<br>
**One Plate Today**는 변화하는 외식 문화를 
반영한 음식점 검색 서비스입니다.<br>
개발기간: 2024.12~2025.03(개인 프로젝트)

<img  alt='스크린샷' width="600" src="https://github.com/user-attachments/assets/202edb5d-e605-4ada-af52-5a7870041d2c"/>

---
<br>

## **프로젝트 소개**<br>
사용자가 원하는 음식점을 쉽고 빠르게 찾을 수 있는 음식점 검색 서비스입니다.
장소 검색과 내 주변 위치 기반 탐색 기능을 통해
현재 위치 또는 특정 지역의 다양한 맛집 정보를 제공합니다.
키워드 기반 검색으로 음식 종류, 분위기, 최신 트렌드에 맞는 음식점도 손쉽게 찾을 수 있습니다.<br>
**React**를 사용하여 웹 애플리케이션을 개발하였고, **Kakao API**를 사용하여 제작하였습니다. **Zustand**로 상태 관리를 구현하고, **SCSS**로 UI를 구성하였습니다.

---
<br>

## **폴더 구조**<br>
```
📦src
 ┣ 📂api
 ┃ ┣ 📜Images.api.js
 ┃ ┣ 📜Kakako_Search_API.js
 ┃ ┣ 📜Kakao_Address_api.js
 ┃ ┗ 📜Kakao_Login_api.js
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜NotoSansKR-Black.ttf
 ┃ ┃ ┣ 📜NotoSansKR-Bold.ttf
 ┃ ┃ ┣ 📜NotoSansKR-ExtraBold.ttf
 ┃ ┃ ┣ 📜NotoSansKR-ExtraLight.ttf
 ┃ ┃ ┣ 📜NotoSansKR-Light.ttf
 ┃ ┃ ┣ 📜NotoSansKR-Medium.ttf
 ┃ ┃ ┣ 📜NotoSansKR-Regular.ttf
 ┃ ┃ ┣ 📜NotoSansKR-SemiBold.ttf
 ┃ ┃ ┣ 📜NotoSansKR-Thin.ttf
 ┃ ┃ ┣ 📜Title_Light.otf
 ┃ ┃ ┗ 📜Title_Medium.otf
 ┃ ┣ 📂Logo
 ┃ ┃ ┣ 📜LogoImage.png
 ┃ ┃ ┣ 📜LogoImage2.png
 ┃ ┃ ┗ 📜LogoImage3.png
 ┃ ┗ 📂Main
 ┃ ┃ ┗ 📜Main2.jpg
 ┣ 📂components
 ┃ ┣ 📂Address
 ┃ ┃ ┗ 📜Address.jsx
 ┃ ┣ 📂input
 ┃ ┃ ┗ 📜SearchInput.jsx
 ┃ ┣ 📂KakaoLogin
 ┃ ┃ ┗ 📜Login.jsx
 ┃ ┣ 📂KakaoMap
 ┃ ┃ ┗ 📜KakaoMap.jsx
 ┃ ┣ 📂Logo
 ┃ ┃ ┗ 📜LogoImage.jsx
 ┃ ┣ 📂Modal
 ┃ ┃ ┗ 📜Modal.jsx
 ┃ ┣ 📂Nav
 ┃ ┃ ┗ 📜NavBar.jsx
 ┃ ┣ 📂PageNation
 ┃ ┃ ┗ 📜PageNation.jsx
 ┃ ┗ 📂SearchBar
 ┃ ┃ ┗ 📜Search.jsx
 ┣ 📂hooks
 ┃ ┣ 📜useCurrentLocation.jsx
 ┃ ┣ 📜useKakaoLogin.jsx
 ┃ ┗ 📜useKakaoMap.jsx
 ┣ 📂pages
 ┃ ┗ 📜Home.jsx
 ┣ 📂store
 ┃ ┣ 📜AddressStore.js
 ┃ ┣ 📜CurResStors.js
 ┃ ┣ 📜KakaoAuthStore.js
 ┃ ┣ 📜ModalStore.js
 ┃ ┣ 📜PaginationStore.js
 ┃ ┗ 📜SearchStore.js
 ┣ 📂styles
 ┃ ┣ 📜Address.scss
 ┃ ┣ 📜Home.scss
 ┃ ┣ 📜KakaoMap.scss
 ┃ ┣ 📜LogoImage.scss
 ┃ ┣ 📜Modal.scss
 ┃ ┣ 📜NavBar.scss
 ┃ ┣ 📜PageNation.scss
 ┃ ┣ 📜Search.scss
 ┃ ┗ 📜SearchInput.scss
 ┣ 📂utils
 ┃ ┗ 📜SessionStorage.js
 ┣ 📜App.js
 ┣ 📜App.scss
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┗ 📜reportWebVitals.js
```

---
<br>

## **주요 기능**<br>

### 1. **소셜로그인(카카오/로그아웃)**
<li>카카오 API에 인가코드 요청 후 인가코드를 추출하여 서버로 전달</li>
<li>인가코드를 전달 받은 서버는 사용자 정보를 받아 엑세스 토큰으로 만들어 클라이언트 서버에게 보냄</li>
<li>엑세스 토큰을 받은 클라이언트 서버는 session storage에 저장하여 로그인 유지</li>
<li>로그아웃 버튼을 누르면 session storage에 저장된 엑세스 토큰을 삭제되며 로그아웃</li>
<img  alt='스크린샷' width="300" src="https://github.com/user-attachments/assets/d4e2e408-94ab-464b-bf9e-a614daee6113"/>
<img  alt='스크린샷' width="700" src="https://github.com/user-attachments/assets/d041ddb3-ac5c-41dc-bc1a-d85c1a62a0cb"/>

<br>

### 2. **장소 및 키워드로 음식점 검색**
<li>검색창에 장소 및 키워드를 입력하여 검색</li>
<li>검색 결과 창과 지도 부분을 분리하여 시각적으로 보기 쉽게 표현</li>
<li>검색 결과가 페이지네이션 변경에 따라 지도에 음식점이 표시</li>
<img  alt='스크린샷' width="700" src="https://github.com/user-attachments/assets/8ac35fb3-4057-4a43-a58e-f5cfe5b4f3a8"/>

<br>

### 3. **현재 위치 주변 검색**
<li>현재 위치 주변 음식점 검색 기능을 버튼 형식으로 제작</li>
<li>현재 위치로부토 5km 반경의 음식점이 표시(현재는 검색 결과 15개까지만 출력)</li>
<li>검색 결과가 페이지네이션 변경에 따라 지도에 음식점이 표시</li>
<img  alt='스크린샷' width="700" src="https://github.com/user-attachments/assets/a47629d7-dec2-42d1-ab33-90d147c13fe1"/>

<br>

### 6. **음식점 상세 정보(모달)**
<li>검색된 음식점들을 클릭하게 되면 음식점 상세 정보가 보여지게 됨</li>
<li>모달 밖의 화면을 클릭하거나 우측 상단의 close 버튼 클릭 시 모달 닫힘</li>
<img  alt='스크린샷' width="700" src="https://github.com/user-attachments/assets/e87f4136-861c-46d8-9465-7c1b7e710a6c"/>

---

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

## **트러블 슈팅**<br>
### 1. Cors 에러 : 
혼자 서버 배포까지 해봐야겠다는 생각이 들어서 처음 서버 개발을 시작하였다 개발을 진행하면서 클라이언트에서 백엔드로 API 요청을 보낼 때 CORS에러를 경험했다.
이는 서로 다른 출처 간의 통신을 브라우저가 보안상 차단하는 정책이였다.
이를 해결하기 위해 Express에 cors 미들웨어를 설치하고 설정하였다.

## **✅ 해결 방법**<br>

<img  alt='스크린샷' width="500" src="https://github.com/user-attachments/assets/b2eb276e-1bae-4cfc-8a8e-5b05ca030274"/>
<img  alt='스크린샷' width="500" src="https://github.com/user-attachments/assets/41eb8b8c-398f-49f3-bbd1-1e1707f4213a"/>

## **✅ 결과**<br>
설정을 완료한 후, 프론트엔드와 백엔드 간의 데이터 통신이 원활하게 이루어졌다.
CORS 에러가 해결되었으며, Express에서 CORS 처리 방식에 대해 깊이 이해할 수 있는 좋은 기회가 되었다.

---

### 2. 500 Internal Server Error (배포 환경에서 발생)
로컬 환경에서는 모든 기능이 정상적으로 작동했지만,
배포 후 API 요청에서 500 Internal Server Error가 반복적으로 발생했다.
처음에는 서버 코드나 API 로직의 문제를 의심했지만, 코드를 아무리 살펴봐도 이상한 부분은 없었다.
에러 로그도 추상적인 메시지만 보여주었고, 구글링 결과도 “서버 내부 오류”라는 일반적인 설명뿐이라 원인 파악이 어려웠다.
그러던 중, 문제는 MongoDB 연결에 있다는 판단이 들어 MongoDB의 에러와 설정 방법을 다시 확인해보았다.
알고 보니 MongoDB Atlas는 기본적으로 외부 접속을 차단하고 있어, 배포된 서버에서 접근하려면 설정 변경이 필요했다.

## **✅ 해결 방법**<br>
MongoDB Atlas의 Network Access 설정에서
허용된 IP 목록에 0.0.0.0/0을 추가하여 모든 IP에서의 접속을 허용했다.

## **✅ 결과**<br>
MongoDB 연결이 정상적으로 이루어지면서
배포 환경에서도 API 요청이 성공적으로 처리되었고,
500 Internal Server Error 문제도 해결되었다.




---

## **배포 링크**<br>
https://restaurant-search-mu.vercel.app






