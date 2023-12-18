<script>
  import { onMount } from 'svelte';
  import Modal from '../components/studyBoardModal.svelte';
  import Detailmodal from '../components/stduypost.svelte';
  import { BACK_ADDR } from '../constants.js'

  let categories = ['전체', '프로그래밍', '어학', '자격증', '취미', '기타'];
  export let selectedCategory;
  let selectedPost = null;
  let isDetailModalOpen = false;
  let showModal = false;
  let posts = [];

  onMount(async () => {
    await fetchBoardPosts();
  });

  async function openDetailModal(post) {
    selectedPost = post;
    isDetailModalOpen = true;
  }

  async function closeDetailModal() {
    isDetailModalOpen = false;
    await fetchBoardPosts();
  }

  function openModal() {
    if (!selectedCategory || selectedCategory === '전체') {
      alert('카테고리를 선택해 주세요!');
    } else {
      showModal = true;
    }
  }

  async function closeModal() {
    showModal = false;
    await fetchBoardPosts(); 
  }

  async function fetchBoardPosts() {
    try {
      const response = await fetch(BACK_ADDR + '/api/board/list');
      if (response.ok) {
        const postData = await response.json();
        posts = postData.boards;
        console.log(posts);
      } else {
        console.log('서버에서 글을 불러오는 데 실패했습니다. 응답 상태 코드:', response.status);
      }
    } catch (error) {
      console.error('글을 불러오는 중 오류 발생:', error);
    }

  }

  function selectCategory(category) {
    selectedCategory = category;
  }
</script>


<div class="header">
  <h2>스터디 / 멘토링 게시판</h2>
</div>

<div class="board">
<nav>
  <ul>
    {#each categories as category}
      <li on:click={() => selectCategory(category)} class:selected={selectedCategory === category}>{category}</li>
    {/each}
  </ul>
</nav>

<div class="center-content">
  <button on:click={openModal}>스터디 모집</button>
</div>

<main>
  {#if showModal}
    <Modal on:close={closeModal} category={selectedCategory} />
  {/if}

  <div class="posts">
    {#if posts.length > 0}
      {#each posts as post, index (post.id)}
        <div class="post" class:even={index % 2 === 0} on:click={() => openDetailModal(post)}>
          <h3>{post.boardName}</h3>
          <span class="category">[{post.category}]</span>
          <p class="meta">
            <span class="author">글쓴이: {post.author}</span>
            <span class="date">작성일: {post.createdAt}</span>
          </p>
          <p class="content">{post.description}</p>
        </div>
      {/each}
    {:else}
      <p>게시글이 없어요! 첫번째 게시물을 작성해주세요.</p>
    {/if}
  </div>
</main>

{#if isDetailModalOpen} <!-- 추가된 부분 -->
<Detailmodal post={selectedPost} on:close={closeDetailModal} />
{/if}
</div>

<style>
  .board {
    max-width: 1200px;
    margin: 0 auto;
  }

  .center-content {
    text-align: center;
    margin-bottom: 20px;
  }

  .meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px; /* Adjust the margin as needed */
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

  nav {
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: center;
  }

  li {
    margin-right: 10px;
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: background-color 0.3s, transform 0.3s, color 0.3s;
    background-color: #fff;
    color: #000;
  }

  li:hover {
    transform: scale(1.15);
  }

  .selected {
    background-color: #007BFF;
    color: #fff;
    transform: scale(1.15);
  }

  button {
    padding: 10px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #218838;
  }

  main {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    align-items: center;
    justify-content: center;
  }

  .posts {
    display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  align-items: center;
  justify-content: center;
  }

  .post {
    margin-bottom: 20px;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, border 0.2s ease;
  }

  .post:hover {
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
    border: 1px solid #36a3f7;
  }

  .post h3 {
    margin-bottom: 10px;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .post .author {
    color: #555;
    margin-bottom: 5px;
  }

  .post .content {
    color: #333;
  }
  .post.even {
  margin-right: 0; /* Add margin to the right of even columns */
}

@media (min-width: 768px) {
  .posts {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }
}

</style>