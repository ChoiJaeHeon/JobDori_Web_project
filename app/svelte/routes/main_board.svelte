<script>

  import { onMount } from 'svelte';
  import { BACK_ADDR } from '../constants.js'
  
    let freeBoardPosts = [];
    let questionBoardPosts = [];
    let studyBoardPosts = [];
    let recruitBoardPosts = [];
    let columnBoardPosts = [];
  
    async function getPosts(boardId, target) {
    try {
      const response = await fetch(BACK_ADDR + `/api/board/posts/${boardId}/top5`);
      if (response.ok) {
        const postData = await response.json();
        for (const post of postData.posts) {
            target.push(post);
        }
        target = postData.posts;
      } else {
        console.log('서버에서 글을 불러오는 데 실패했습니다. 응답 상태 코드:', response.status);
      }
    } catch (error) {
      console.error('글을 불러오는 중 오류 발생:', error);
    }
  }
  
    // 각 게시판의 글 불러오기
    async function loadBoardPosts() {
      await getPosts(1, freeBoardPosts);
      await getPosts(2, questionBoardPosts);
      await getPosts(3, studyBoardPosts);
      await getPosts(4, recruitBoardPosts);
      await getPosts(5, columnBoardPosts);
    }
  
    // 컴포넌트가 마운트될 때 글 불러오기 함수 호출
    onMount(async () => {
      await loadBoardPosts();
    });
  </script>
  
  <style>
    /* 스타일 추가 */
    .main-section {
      position: relative;
      height: 60vh; 
      background-color: #A2C9E3;
      overflow: hidden;
    }
  
    .overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
    }
  
    .main-title {
      margin-top: -20px;
      font-size: 10rem;
      color: #192F45;
      opacity: 0; /* 처음에는 투명하게 설정 */
      transform: translateY(20px); /* translateY 값 조정 */
      font-family: 'OrelegaOne', sans-serif;
      animation: fadeInUp 1s ease-in-out 0.5s forwards; /* 슬라이드 애니메이션 적용 */
    }
  
    .slogan {
      margin-top: -70px;
      font-size: 2rem;
      color: #192F45;
      opacity: 0; /* 처음에는 투명하게 설정 */
      transform: translateY(5px); /* translateY 값 조정 */
      font-family: 'GmarketSans_bold', sans-serif;
      animation: fadeInUp 1s ease-in-out 1s forwards; /* 슬라이드 애니메이션 적용, 시작 시간 조정 */
    }
  
    /* fadeInUp 애니메이션 정의 */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    .board-posts {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }
  
    .board-section {
      max-width: 300px;
      margin: 20px;
      padding: 16px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  
    .board-section h2 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
  
    .board-post {
      margin-top: 10px;
      border-top: 1px solid #ddd;
      padding-top: 10px;
    }
  
    .board-post p {
      color: #333;
    }
  </style>
  
  <div class="main-section">
    <div class="overlay">
      <h1 class="main-title">JOB : DORI</h1>
      <p class="slogan">잡도리: 단단히 준비하거나 대책을 세우다.</p>
    </div>
  </div>
  
  <div class="board-posts">
    <div class="board-section">
      <h2>채용공고</h2>
      {#each recruitBoardPosts as post (post.id)}
        <div class="board-post">
          <h3>{post.title}</h3>
        </div>
      {/each}
    </div>
  
    <div class="board-section">
      <h2>스터디 모집</h2>
      {#each studyBoardPosts as post (post.id)}
        <div class="board-post">
          <h3>{post.title}</h3>
        </div>
      {/each}
    </div>
  
    <div class="board-section">
      <h2>자유게시판</h2>
      {#each freeBoardPosts as post (post.id)}
        <div class="board-post">
          <h3>{post.title}</h3>
        </div>
      {/each}
    </div>
  
    <div class="board-section">
      <h2>질문게시판</h2>
      {#each questionBoardPosts as post (post.id)}
        <div class="board-post">
          <h3>{post.title}</h3>
        </div>
      {/each}
    </div>
  
    <div class="board-section">
      <h2>칼럼게시판</h2>
      {#each columnBoardPosts as post (post.id)}
        <div class="board-post">
          <h3>{post.title}</h3>
        </div>
      {/each}
    </div>
  </div>