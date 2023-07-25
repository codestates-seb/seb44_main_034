
<h1>
  <span class="text">CAFE-IN</span>
  <span class="image">
    <img src="images/common/cafein.svg" alt="CAFE-IN" height="40" width="40">
  </span>
</h1>
<p align="center">
  <br>
  <img src="images/common/logo-sample.jpg">
  <br>
</p>



<p align="center">
  <strong>어디가 핫하지 ?! 내 취향인 카페는 어딨을까 ?!</strong> <br>
  인기 있는 카페 순으로 확인하고,<br> 
  사용자의 취향에 따른 카테고리별 필터링, 메뉴 후기, 이벤트 공지 등 다양한 기능을 제공하며 <br>
  사용자들의 맞춤형 카페를 제공해줄 수 있는 웹서비스!<br>
  반응형 웹 페이지로 <strong>모바일 사용자 환경을 우선 지원</strong>합니다!<br>
</p>

<br>
<br>

## 배포 링크 (https://cafein34.vercel.app/)

<br>
<br>

## 목차

- [팀원소개](#팀원소개)
- [프로젝트 소개](#프로젝트-소개)
- [기술 스택](#기술-스택)
- [구현 기능](#구현-기능)
- [기능별 담당자 소개](#기능별-담당자-소개)
- [Documents](#Documents)
- [Git Commit & PR Message](#git-commit--pr-message)

<br>
<br>

## 팀원소개

|  ![woman] |  ![woman] |  ![man]   |  ![woman] |  ![woman] |  ![man]   |  ![man]   |
| :-------: | :-------: | :-------: | :-------: | :-------: | :-------: | :-------: |
|   [배정빈](https://github.com/baejb)  |   [김가영](https://github.com/sogood17)  |   [유희준](https://github.com/yuheejone)   |  [조하얀](https://github.com/cwhite723)   |  [김현희](https://github.com/hellok09)   |  [노성윤](https://github.com/NOHSUNGYOON)   |  [김득렬](https://github.com/RYEOL-KIM)   |
|  **FE 팀장**  |    FE     |    FE     | **BE 부팀장** |     BE    |    BE     |    BE     |

<br><br>

## 🔎기능별 담당자 소개

### Front-end
|배정빈|김가영|유희준|
|:-------:|:-------:|:-------:|
| 카페 상세 정보 추가, 수정,삭제<br>카페 메뉴 추가, 수정 ,삭제<br>카페 삭제<br>카페 상세정보 페이지(카페 정보, 카페 메뉴 조회)<br>카페 메뉴 댓글 조회,추가,수정,삭제<br>카카오 지도 api 활용한 카페 위치 표시<br>입력받은 주소를 좌표로 변환 <br>배포 담당 <br>|포스트 작성, 수정, 삭제<br>댓글, 대댓글 작성, 수정, 삭제<br>웹에디터 기능<Br>포스트 북마크<br>포스트리스트 페이지네이션<br>검색 기능<br>초기 배포 담당 <br>|개인, 사업자 회원가입<br>로그인, 로그아웃<br>Google Oauth2 로그인<br>마이페이지 개인정보 조회, 수정<br>마이페이지 북마크한 카페, 북마크한 포스트, 작성한 포스트 무한스크롤<br>일반유저 마이페이지 개인 정보 조회, 팔로우, 언팔로우, 작성한 포스트 무한스크롤<br>메인 페이지 페이지 네이션 <br>회원 탈퇴 <br> |


### Back-end
|조하얀|김현희|노성윤|김득렬|
|:---------:|:---------:|:---------:|:---------:|
| 카페 CRUD <br> 메뉴 CRUD<br>  메뉴 댓글 CRUD <br> 동적 쿼리를 이용한 필터, 정렬 기능 <br> S3 이미지 업로드 <br> 인프라(도메인, 로드밸런서, https)<br> | 회원 CRUD<br>  follow 기능 <br>| Security<br>  JWT <br>  OAuth2 구글로그인 <br>  점주CRUD <br>| 포스트 CRUD<br>  댓글 CRUD<br> 대댓글 CRUD <br>  포스트 북마크<br> 포스트 태그<br> 초기 SQL 설정<br>|

## 프로젝트 소개


<p align="center">
<strong> " 어디가 핫하지? 내 취향인 카페는 어딨을까? "</strong><br> 라는 물음에서 시작된 카페인 사이트는<br>
인기 있는 카페 순으로 정렬해볼 수 있고, 취향별로 찾아볼 수 있는 기능이 구현되어 있습니다.<br><br>
사용자의 취향에 따른 시설, 감성 태그 필터링, 메뉴 후기, 이벤트 공지 등 다양한 기능을 제공하며<br>
사용자들의 맞춤형 카페를 제공해줄 수 있는 웹서비스입니다.<br><br>
개인회원으로 가입하여 포스트 작성, 댓글 작성, 다른 유저 팔로우, 메뉴 댓글 작성을 이용할 수 있습니다.<br>
사장님회원으로 가입하여 카페를 등록하고, 메뉴를 등록할 수 있습니다. 내 카페를 팔로우하는 유저의 수도 확인할 수 있습니다.<br><br>
</p>
<br><br>

<br><br>

## 💎기술 스택

### Front-End

|   HTML    |    CSS    | JavaScript | TypeScript | React     | StyledComponents | ReactQuery | Recoil|
| :-------: | :-------: | :--------: | :--------: | :-------: |  :-------------: | :--------: | :----: |
|  ![html]  |  ![css]   | ![js](./images/stack/js2.svg) | ![Typescript](./images/stack/ts.svg) |![react] | ![StyledComponents](./images/stack/styledcomponents.svg)| ![ReactQuery](./images/stack/reactquery.svg)|  <img src=https://github.com/codestates-seb/seb44_main_034/raw/README/images/stack/recoil2.svg width=60px height=60px>| 

|   Vite    |    Jwt    | GoogleOauth |  EsLint   |  Prettier  | Axios | Vercel | 
| :-------: | :-------: | :--------: | :------: | :----------: |  :-------------: | :--------: |
|  ![vite](./images/stack/vite.svg)  | <img src=https://github.com/codestates-seb/seb44_main_034/raw/README/images/stack/jwtimg.png width=60px height=60px> |   ![googleoauth](./images/stack/google.svg)    | ![eslint](./images/stack/eslint.svg) | ![prettier](./images/stack/prettier.svg)| ![axios](./images/stack/axios.svg)| ![vercel](./images/stack/vercel.svg)|


<br><br>

### Back-end
|  JAVA   |SpringBoot| SpringSecurity |  JPA   |   MYSQL   |  JWT   |
| :-----: | :-------: | :--------: | :------: | :-----: | :-----: | 
| ![java] |<img src="https://github.com/codestates-seb/seb44_main_034/assets/111395967/48fb4b1c-16db-43f5-9d72-1ac2ff7a640d" width ="80" height ="50">|<img src="https://github.com/codestates-seb/seb44_main_034/assets/111395967/3183de14-78c3-41ea-8812-f9cfc1965ece" width ="80" height ="50"> |<img src="https://github.com/codestates-seb/seb44_main_034/assets/111395967/78414aad-c1af-4bcb-a2f7-8f6703c87b96" width ="80" height ="50">  |<img src="https://github.com/codestates-seb/seb44_main_034/assets/111395967/e92edcd5-6dca-4e63-b006-2b1b7973b2dc" width ="80" height ="50"> |<img src="https://github.com/codestates-seb/seb44_main_034/assets/111395967/80fe6786-8c00-4080-890d-b2a207dc5889" width ="80" height ="50">  |

### 공통
|   Amazon| Git hub | 
| :-------: | :--------: | 
| <img src="https://github.com/codestates-seb/seb44_main_034/assets/111395967/056f2c19-eba1-43b3-ae39-860b30aaee1e" width ="80" height ="80">  |   <img src="https://github.com/codestates-seb/seb44_main_034/assets/111395967/d8741c52-c5b5-4280-b1d9-cf5a13d66b6f" width ="80" height ="50"> |


<br>

## 구현 기능

### 기능 1
<strong>회원 가입 기능</strong><br>
사장님 회원과 개인 회원으로 가입이 가능하고,<br>
유저별로 다른 기능을 이용할 수 있습니다.<br>
토큰 방식으로 가입을 구현하였고,<br>
Google OAuth 방식으로 가입 및 로그인할 수 있습니다.<br><br>
### 기능 2
<strong>유저 팔로우, 북마크 기능</strong><br>
사장님 회원은 카페 팔로우를 확인할 수 있습니다. <br>
개인 회원은 다른 회원을 팔로우할 수 있고, 나를 팔로우한 사람을 조회할 수 있습니다.<br>
개인 회원은 카페와 포스트를 북마크할 수 있습니다.<br><br>
### 기능 3
<strong>회원별 기능</strong><br>
사장님 회원: 카페 등록, 수정, 삭제, 메뉴 등록, 수정, 삭제. 카페 팔로워 조회<br>
개인 회원: 포스트 등록, 수정, 삭제, 댓글, 대댓글 등록, 수정, 삭제.<br>
회원 팔로우, 팔로잉. 카페, 포스트 북마크. 카카오톡 소셜 공유.<br>
글 작성은 회원만 등록할 수 있고, 작성자만 수정, 삭제할 수 있습니다.<br><br>
### 기능 4
<strong>검색 기능</strong><Br>
메인에서 카페 이름, 메뉴 이름으로 검색할 수 있고,<br>
태그 검색을 활용하여 취향에 맞는 카페를 조회할 수 있습니다.<br>
카페 포스트 순, 별점 순 조회로 인기 있는 카페를 한눈에 확인할 수 있습니다.<br><br>


## 📄Documents
- [API 문서](https://documenter.getpostman.com/view/26575250/2s946o2oSh)
- [ERD](https://www.erdcloud.com/d/HBWEXRzvdih98w3A5)


<br><br>

## ✨Git Commit & PR Message

|Message|  설명       |
|:-------|:----------------|
|✨[feat]|새로운 기능을 추가할 경우|
|🐛[fix]|버그를 고친 경우|
|💄[design]|CSS 등 사용자 UI 디자인 변경|
|🎨[style]|코드 포맷변경, 세미콜론 누락, 코드수정이 없는 경우.|
|♻[refactor]|프로덕션 코드 리펙토링할 경우|
|💡[comment]|필요한 주석 추가 및 변경|
|📝[docs]|문서를 수정한 경우|
|✅[test]|테스트 코드 작업을 할 경우|
|📦[chore]|빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우|
|🚚[rename]|파일 혹은 폴더명을 수정하거나 옮기는 작업만 하는 경우|
|🔥[remove]|삭제하는 작업만 수행한 경우|
|🚑[!HOTFIX]|급하게 치명적인 버그를 고침|

<p align="justify">

</p>

<br>

<!-- Icon Refernces -->

[html]: images/stack/html.svg
[js]: images/stack/javascript.svg
[react]: images/stack/react.svg
[css]: images/stack/css.svg
[java]: images/stack/java.svg
[man]: images/common/man.jpg
[woman]: images/common/woman.jpg
[cafein]: images/common/cafein.svg

