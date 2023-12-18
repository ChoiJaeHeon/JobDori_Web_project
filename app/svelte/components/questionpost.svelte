<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { BACK_ADDR } from '../constants.js'

  let dispatch = createEventDispatcher();
  export let post;

  let comments = []; // 댓글 목록을 저장할 상태 변수 추가
  let newComment = ''; // 사용자가 작성 중인 댓글을 저장할 상태 변수 추가

  async function closeModal() {
    dispatch('close');
  }

  async function fetchComments() {
    try {
      const response = await fetch(BACK_ADDR + `/api/posts/${post.id}/comment`); // post.id 또는 해당하는 식별자 사용
      if (response.ok) {
        const commentsData = await response.json();
        comments = commentsData;
      } else {
        console.log('서버에서 댓글을 불러오는 데 실패했습니다. 응답 상태 코드:', response.status);
      }
    } catch (error) {
      console.error('댓글을 불러오는 중 오류 발생:', error);
    }
  }

  async function postComment() {
    try {
      const response = await fetch(BACK_ADDR + `/api/comment/${post.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        // 댓글을 성공적으로 작성한 후, 다시 댓글 목록을 불러옵니다.
        await fetchComments();
        newComment = ''; // 댓글 입력 필드 초기화
      } else {
        console.log('서버에 댓글을 작성하는 데 실패했습니다. 응답 상태 코드:', response.status);
      }
    } catch (error) {
      console.error('댓글을 작성하는 중 오류 발생:', error);
    }
  }

  onMount(async() => {await fetchComments()}); 
</script>

<style>
  /* Add your styles for the post detail modal */
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    max-width: 1100px; /* 최대 너비 1000px로 조절 */
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  h2 {
    text-align: center;
  }

  .meta {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #555;
  }

  p {
    font-size: 1rem;
    color: #333;
    line-height: 1.6;
  }

  textarea {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 15px;
    padding: 10px;
    font-size: 1rem;
  }

  button {
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>

<div class="modal">
  <div class="modal-content">
    <h2>{post.title}</h2>
    <div class="meta">
      <span>글쓴이: 익명의 누군가</span>
      <span>작성일: {post.postDate}</span>
    </div>
    <p>{post.content}</p>

    <!-- 댓글 목록 표시 -->
    {#if comments.length > 0}
      <h3>댓글</h3>
      <ul>
        {#each comments as comment, index (index)}
        <li>
            <strong>익명의 누군가</strong>: {comment.content}
            <span style="float: right;">{comment.commentDate}</span>
        </li>
        {/each}
      </ul>
    {/if}

    <!-- 댓글 입력 폼 -->
    <textarea bind:value={newComment}></textarea>
    <button on:click={postComment}>댓글 작성</button>

    <button on:click={closeModal}>닫기</button>
  </div>
</div>