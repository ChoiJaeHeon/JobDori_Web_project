<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { BACK_ADDR } from '../constants.js';
  
    let dispatch = createEventDispatcher();
    export let post;
  
    let comments = [];
    let newComment = '';
    let isEditing = false;  
    let editedPost = {
      title: post.title,
      content: post.content,
    };
  
    async function closeModal() {
      dispatch('close');
    }

    async function fetchComments() {
      try {
        const response = await fetch(BACK_ADDR + `/api/posts/${post.id}/comment`);
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
          await fetchComments();
          newComment = '';
        } else {
          console.log('서버에 댓글을 작성하는 데 실패했습니다. 응답 상태 코드:', response.status);
        }
      } catch (error) {
        console.error('댓글을 작성하는 중 오류 발생:', error);
      }
    }
  
    async function editPost() {
      try {
        const response = await fetch(BACK_ADDR + `/api/posts/${post.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedPost),
        });
  
        if (response.ok) {
          await fetchComments();
          isEditing = false;
          alert('게시글을 수정하였습니다.');
          await closeModal();
        } else {
          console.log('서버에 글을 수정하는 데 실패했습니다. 응답 상태 코드:', response.status);
        }
      } catch (error) {
        console.error('글을 수정하는 중 오류 발생:', error);
      }
    }
  
    async function deletePost() {
      try {
        const response = await fetch(BACK_ADDR + `/api/posts/${post.id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          dispatch('close');
        } else {
          console.log('서버에서 글을 삭제하는 데 실패했습니다. 응답 상태 코드:', response.status);
        }
      } catch (error) {
        console.error('글을 삭제하는 중 오류 발생:', error);
      }
    }
  
    onMount(async () => {
      await fetchComments();
    });
  </script>
  
  <style>
    /* 모달 스타일 수정 */
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
      max-width: 1100px;
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
      margin-top: 10px; /* 버튼 간격 추가 */
      border: none;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
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
      <h2>{post.boardName}</h2>
      <div class="meta">
        <span>글쓴이: {post.author}</span>
        <span>작성일: {post.createdAt}</span>
      </div>
      <p>{post.content}</p>
  
      <!-- 글 수정 폼 -->
      {#if isEditing}
        <div class="edit-post-form">
          <textarea bind:value={editedPost.content}></textarea>
          <div class="edit-buttons">
            <button class="edit" on:click={editPost}>수정</button>
            <button class="delete" on:click={deletePost}>삭제</button>ㄴ
          </div>
        </div>
      {/if}
  
      <!-- 댓글 목록 표시 -->

      {#if comments.length > 0}
      <h3>댓글</h3>
      <ul>
        {#each comments as comment, index (index)}
          <li>
            <strong>{comment.author}</strong>: {comment.content}
            <span style="float: right;">{comment.commentDate}</span>
          </li>
        {/each}
      </ul>
      {/if}
  
      <!-- 댓글 입력 폼 -->
      <textarea bind:value={newComment}></textarea>
      <button on:click={postComment}>댓글 작성</button>
  
      <!-- 수정 및 삭제 버튼 -->
        {#if !isEditing}
          <button class="edit" on:click={() => isEditing = true}>수정</button>
        {/if}
        <button class="delete" on:click={deletePost}>삭제</button>
  
      <button on:click={closeModal}>닫기</button>
    </div>
  </div>
  