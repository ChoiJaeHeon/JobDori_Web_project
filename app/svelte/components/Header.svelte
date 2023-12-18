<script>
    import { link } from "svelte-spa-router";
    import { onMount } from "svelte";
    import { BACK_ADDR } from '../constants.js'

    let userProfile = null;
    let showProfileButton = false;
  
    onMount(async () => {
      try {
        const response = await fetch(BACK_ADDR + '/api/user/my/info', {
          credentials: 'include' // 쿠키를 포함하여 요청
        });
  
        if (response.ok) {
          const data = await response.json();
          userProfile = data;
          if (userProfile.profileUrl === null) {
            userProfile.profileUrl = '/cutie.png';
          }
          showProfileButton = true;
        } else {
          showProfileButton = false;
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        showProfileButton = false;
      }
    });
  
    // 구글 로그인 버튼 클릭 시 실행할 함수
    function handleGoogleLogin() {
      window.location.href = BACK_ADDR + "/api/auth/kakao"; 
    } 
  </script>

<header>
  <div class="logo-container">
    <img src="/logo.png" alt="Logo" class="logo">
    <a class="mainboard-link" use:link href="/">Job:Dori</a>
  </div>
  <nav class="centered-nav">
    <ul>
      <li><a use:link href="/recruitboard">채용공고</a></li>
      <li><a use:link href="/studyboard">스터디 모집</a></li>
      <li><a use:link href="/freeboard">자유게시판</a></li>
      <li><a use:link href="/questionboard">질문게시판</a></li>
      <li><a use:link href="/columnboard">칼럼게시판</a></li>
    </ul>
  </nav>
  {#if showProfileButton && userProfile}
  <a use:link href="/profile">
    <img src={userProfile.profileUrl} alt="Profile" class="profile-image">
  </a>
  {:else}
  <!-- 구글 로그인 버튼 -->
  <button on:click={handleGoogleLogin}>Sign in with KAKAO</button>
  {/if}
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #000;
    color: white;
    position: relative;
    z-index: 1; /* 다른 요소 위에 표시되도록 설정 */
  }

  .logo-container {
    display: flex;
    align-items: center;
  }

  button {
    background-color: white; /* 구글 로그인 색상 */
    color: black;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 13px;
    border-radius: 4px; /* 버튼 모서리 둥글게 만들기 */
  }

  button:hover {
    background-color: #36a3f7;
    color: white;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 20px;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #36a3f7;
  }

  /* 스타일 추가 */
  .logo {
    width: 45px;
    height: 45px;
  }

  .mainboard-link {
    margin-left: 5px;
    text-decoration: none;
    font-family: 'GmarketSans_bold', sans-serif;
    transition: color 0.3s ease;
  }

  .mainboard-link:hover {
    color: white;
  }

  /* 프로필 이미지 스타일 */
  .profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 5px;
  }

  /* 수정된 부분: 네비게이션 바 스타일 */
  nav {
    display: flex;
    align-items: center;
    position: absolute;
    left: 50%; /* 화면 가로 중앙에 위치하도록 설정 */
    transform: translateX(-50%);
    background-color: #000;
    z-index: 0; /* 헤더 아래에 위치하도록 설정 */
  }

  .centered-nav {
    padding: 10px 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }

  li {
    margin-left: 40px;
  }
</style>
