<script>
  import { onMount } from 'svelte';
  import Modal from '../components/freeModal.svelte';
  import Detailmodal from '../components/normalpost.svelte';
  import { BACK_ADDR } from '../constants.js';

  let posts = [];
  let selectedPost = null;
  let showModal = false;
  let isDetailModalOpen = false; // 수정된 부분

  function openModal() {
    showModal = true;
  }


  async function openDetailModal(post) {
    selectedPost = post;
    isDetailModalOpen = true;
  }

  async function closeDetailModal() {
    isDetailModalOpen = false;
    await fetchBoardPosts();
  }

  async function closeModal() {
    showModal = false;
    await fetchBoardPosts();
  }

  async function fetchBoardPosts() {
    try {
      const response = await fetch(BACK_ADDR + '/api/board/posts/1');
      if (response.ok) {
        const postData = await response.json();
        posts = postData.posts;
      } else {
        console.log('서버에서 글을 불러오는 데 실패했습니다. 응답 상태 코드:', response.status);
      }
    } catch (error) {
      console.error('글을 불러오는 중 오류 발생:', error);
    }
  }
  
  onMount(async () => {
    await fetchBoardPosts();
  });
</script>

<style>
  /* 스타일 추가 */
  .board {
    max-width: 1000px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 20px;
  }

  h2 {
    margin-top: 70px;
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .posts {
    display: grid;
    grid-template-columns: 1fr;
    gap: 25px;
    justify-content: center;
    align-items: center;
  }

  .post {
    position: relative;
    background-color: #ffffff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, border 0.2s ease;
  }

  .post:hover {
    transform: scale(1.02);
    border: 0.1px solid #36a3f7;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  p {
    color: #555;
  }

  .write-button {
    position: relative;
    bottom: 30;
    right: -940px;
    background-color: #36a3f7;
    color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 20px;
    transition: background-color 0.3s;
  }

  .meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px; /* Adjust the margin as needed */
}

  .write-button:hover {
    background-color: #007bb5;
  }
</style>

<div class="board">
  <div class="header">
    <h2>자유게시판</h2>
  </div>

  <!-- 게시판 페이지 -->
  <button class="write-button" on:click={openModal}>글쓰기</button>

  <div class="posts">
    {#if posts.length > 0}
      {#each posts as post}
      <div class="post" on:click={() => openDetailModal(post)}>
          <h3>{post.title}</h3>
          <p class="meta">
            <span class="author">글쓴이: {post.author}</span>
            <span class="date">작성일: {post.postDate}</span>
          </p>
          <p class="content">{post.content}</p>
        </div>
      {/each}
    {:else}
      <p>게시글이 없어요! 첫번째 게시물을 작성해주세요.</p>
    {/if}
  </div>

  {#if showModal}
    <Modal on:close={closeModal} />
  {/if}
  
  {#if isDetailModalOpen} <!-- 추가된 부분 -->
  <Detailmodal post={selectedPost} on:close={closeDetailModal} />
{/if}

</div>