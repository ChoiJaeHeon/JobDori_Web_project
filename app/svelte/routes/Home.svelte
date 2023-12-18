<script>

  import { onMount } from 'svelte';
  import { BACK_ADDR } from '../constants.js'
  
    let freeBoardPosts = [];
    let questionBoardPosts = [];
    let studyBoardPosts = [];
    let recruitBoardPosts = [];
    let columnBoardPosts = [];
  
    async function getPosts(boardId) {
    try {
      const response = await fetch(BACK_ADDR + `/api/board/posts/${boardId}/top5`);
      if (response.ok) {
        const postData = await response.json();
        return postData.posts;
      } else {
        console.log('서버에서 글을 불러오는 데 실패했습니다. 응답 상태 코드:', response.status);
      }
    } catch (error) {
      console.error('글을 불러오는 중 오류 발생:', error);
    }
  }
  
    // 각 게시판의 글 불러오기
    async function loadBoardPosts() {
      freeBoardPosts = await getPosts(1);
      questionBoardPosts = await getPosts(2);
      studyBoardPosts = await getPosts(5);
      recruitBoardPosts = await getPosts(4);
      columnBoardPosts = await getPosts(3);
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
      <h2>스터디 모집</h2>
      {#if studyBoardPosts.length > 0}
        {#each studyBoardPosts as post}
        <div class="post">
          <h3>{post.title}</h3>
        </div>
      {/each}
      {:else}
        <p>게시글이 없어요! 첫번째 게시물을 작성해주세요.</p>
      {/if}
    </div>
  
    <div class="board-section">
      <h2>자유게시판</h2>
      {#if freeBoardPosts.length > 0}
        {#each freeBoardPosts as post}
        <div class="post">
          <h3>{post.title}</h3>
        </div>
      {/each}
      {:else}
        <p>게시글이 없어요! 첫번째 게시물을 작성해주세요.</p>
      {/if}
    </div>
  
    <div class="board-section">
      <h2>질문게시판</h2>
      {#if questionBoardPosts.length > 0}
        {#each questionBoardPosts as post}
        <div class="post">
          <h3>{post.title}</h3>
        </div>
      {/each}
      {:else}
        <p>게시글이 없어요! 첫번째 게시물을 작성해주세요.</p>
      {/if}
    </div>
  
    <div class="board-section">
      <h2>칼럼게시판</h2>
      {#if columnBoardPosts.length > 0}
        {#each columnBoardPosts as post}
        <div class="post">
          <h3>{post.title}</h3>
        </div>
      {/each}
      {:else}
        <p>게시글이 없어요! 첫번째 게시물을 작성해주세요.</p>
      {/if}
    </div>
  </div>
  