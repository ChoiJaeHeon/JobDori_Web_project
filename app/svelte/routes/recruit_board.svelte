<!-- FreeBoard.svelte -->
<script>
  let posts = [];
  let selectedPost = null; // 선택된 채용 공고의 상세 정보
  let showModal = false; // 모달 표시 여부

  // 임시 데이터
  const tempData = [
    { id: 1, title: 'NAVER', content: '신입 | 백엔드 개발자 채용', additionalInfo: '2024년 1월 7일', skill: 'Java, Spring'} ,
    { id: 2, title: 'KAKAO', content: '경력 | 프론트엔드 개발자 채용', additionalInfo: '2024년 1월 10일', skill: 'React, Vue' },
    { id: 3, title: 'LINE', content: '신입 | DBA 채용', additionalInfo: '2023년 12월 25일', skill: 'Python, Django' },
    { id: 4, title: 'COUPANG', content: '신입 | 앱 개발자 채용', additionalInfo: '2024년 1월 7일', skill: 'React Native' },
    { id: 5, title: '배달의 민족', content: '신입 | 웹디자이너 채용', additionalInfo: '2024년 1월 23일', skill: 'Adobe XD' },
    { id: 6, title: '당근마켓', content: '경력 |  서버 개발자 채용', additionalInfo: '2024년 1월 15일', skill: 'Python, Django' },
    { id: 7, title: 'TOSS', content: '신입 |  백엔드 개발자 채용', additionalInfo: '2024년 1월 27일', skill: 'Java, Spring' },
    { id: 8, title: 'GOOGLE', content: '신입 | 광운대 정융 무조건 채용', additionalInfo: '광운대 정융 항시 채용', skill: '정융 학생은 몸만 오면 됨' },
    { id: 9, title: '야놀자', content: '신입 | 앱 개발자 채용', additionalInfo: '2024년 2월 7일', skill: 'React Native'},
    { id: 10, title: 'SAMSUNG', content: '신입 | 프론트엔드 개발자 채용', additionalInfo: '2024년 2월 7일', skill: 'React, Vue'},
    { id: 11, title: 'KB 국민은행', content: '신입 | 서버 개발자 채용', additionalInfo: '2024년 2월 14일', skill: 'Java, Spring'},
    { id: 12, title: 'BLIZZARD', content: '신입 | 게임 개발자 채용', additionalInfo: '2024년 2월 27일', skill: 'C, C++'},
  ];

  // 컴포넌트가 마운트될 때 데이터 할당
  $: posts = tempData;

  function showPostDetails(post) {
    selectedPost = post;
    showModal = true;
  }

  function hideModal() {
    showModal = false;
  }
</script>

<style>
  /* 게시글 목록 스타일 */
  .board {
    max-width: 800px;
    margin: 0 auto; 
  }

  .header {
    text-align: center;
    margin-bottom: 20px;
  }

  h2 {
    margin-top: 70px;
    font-size: 2rem;
    margin-bottom: 50px;
  }

  .posts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 23px;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
  }

  .post {
    background-color: #f9f9f9;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    transition: transform 0.2s ease;
  }

  .post:hover {
    transform: scale(1.05);
  }

  p {
    color: #555;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    width: 70%; /* 너비 조절 */
    max-width: 600px; /* 최대 너비 지정 */
    height: auto; /* 높이 자동 조절 */
    max-height: 80vh; /* 최대 높이 지정 (뷰포트 높이의 80%) */
  }

</style>

<div class="board">
  <div class="header">
    <h2>채용공고 게시판</h2>
  </div>

  <div class="posts">
    {#each posts as post (post.id)}
      <div class="post" on:click={() => showPostDetails(post)}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    {/each}
  </div>
  
  {#if showModal}
  <div class="modal" on:click={hideModal}>
    <div class="modal-content" on:click={(e) => e.stopPropagation()}>
      <h2>{selectedPost.title}</h2>
      <p>{selectedPost.content}</p>
      <p>마감일자: {selectedPost.additionalInfo}</p>
      <p>스킬: {selectedPost.skill}</p>
    </div>
  </div>
{/if}
</div>