<script>
    import { onMount } from 'svelte';
    import { BACK_ADDR } from '../constants.js';
    import Detailmodal from '../components/questionpost.svelte';

  let selectedPost = null;
  let isDetailModalOpen = false;

  let posts = [];
  let newPost = {
    title: '',
    content: '',
    boardName: '질문게시판',
  };

  async function openDetailModal(post) {
    selectedPost = post;
    isDetailModalOpen = true;
  }

  async function closeDetailModal() {
    isDetailModalOpen = false;
    await fetchBoardPosts();
  }

  // 글쓰기 함수
  async function addPost() {
    try {
      const response = await fetch(BACK_ADDR + '/api/posts/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const postData = await response.json();
        posts = [postData, ...posts];
        console.log('글이 성공적으로 작성되었습니다.');

        // 글이 성공적으로 작성된 후 폼 초기화
        newPost = {
          title: '',
          content: '',
          boardName: '질문게시판', // 하드코딩으로 2로 설정
        };
      } else {
        alert('로그인 후 이용해주세요.');
      }
    } catch (error) {
      console.error('글 추가 중 오류:', error);
    }
  } 

  async function fetchBoardPosts() {
    try {
      const response = await fetch(BACK_ADDR + '/api/board/posts/2');
      if (response.ok) {
        const postData = await response.json();
        posts = postData.posts; // 데이터 구조에 맞게 수정
      } else {
        console.log('서버에서 글을 불러오는 데 실패했습니다. 응답 상태 코드:', response.status);
      }
    } catch (error) {
      console.error('글을 불러오는 중 오류 발생:', error);
    }
  }
  // 컴포넌트가 마운트될 때 글 불러오기 함수 호출
  onMount(async () => {
    await fetchBoardPosts();
  });

  let contentHintVisible = true;

  function hideContentHint() {
    contentHintVisible = false;
  }
</script>

<style>
  /* 스타일 추가 */
  div {
    max-width: 1000px;
    margin: 0 auto;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  #contentHint {
    font-size: 0.8rem;
    color: #aaa;
    transition: opacity 0.3s ease;
    cursor: text;
  }

  #contentHint.invisible {
    opacity: 0;
    pointer-events: none;
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

  .post .content {
    color: #333;
  }

  label {
    margin-bottom: 8px;
    font-weight: bold;
  }

  input, textarea {
    margin-bottom: 16px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    background-color: #36a3f7;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
  }

  div > div {
    background-color: #ffffff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
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

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    color: #555;
  }
</style>

<div class="header">
  <h2>질문게시판</h2>
</div>

<div>
  <!-- 글쓰기 폼 -->
  <form on:submit|preventDefault={addPost}>

    <label for="title">제목</label>
    <input type="text" id="title" bind:value={newPost.title} />

    <label for="content">내용</label>
    <textarea id="content" bind:value={newPost.content} on:click={hideContentHint}></textarea>

    <p id="contentHint">질문 게시판은 익명이며, 수정 삭제가 불가능합니다.</p>
    

    <button type="submit">글쓰기</button>
  </form>

  <div class="posts" >
    {#if posts.length > 0}
      {#each posts as post, index}
        <div class="post" class:even={index % 2 === 0}    on:click={() => openDetailModal(post)}>
          <h3>{post.title}</h3>
          <p class="content">{post.content}</p>
        </div>
      {/each}
    {:else}
      <p>게시글이 없어요! 첫번째 게시물을 작성해주세요.</p>
    {/if}
  </div>
  
  {#if isDetailModalOpen} <!-- 추가된 부분 -->
  <Detailmodal post={selectedPost} on:close={closeDetailModal} />
  {/if}
</div>
