<script>
    import { createEventDispatcher } from 'svelte';
    import { BACK_ADDR } from '../constants.js'
    
    let dispatch = createEventDispatcher();
  
    let title = '';
    let content = '';
    async function submitForm() {
      if (!title || !content) {
        alert('제목과 내용을 작성해주세요.');
        return;
      }
      // API 호출
      fetch(BACK_ADDR + '/api/posts/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boardName: '자유게시판',
          title,
          content,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          title = '';
          content = '';
          alert('자유게시판 글 작성에 성공했습니다.');
          closeModal();
        })
        .catch(error => {
          console.error('글 작성 중 오류:', error);
          alert('로그인 후 이용해주세요.');
        });
    }
  
    function closeModal() {
        dispatch('close');
    }
  </script>
  
  <div class="modal">
    <div class="modal-content">
      <h2>자유게시판 글 작성</h2>
  
      <label for="title">제목:</label>
      <input type="text" bind:value={title} id="title">
  
      <label for="content">내용:</label>
      <textarea bind:value={content} id="content"></textarea>
  
      <button on:click={submitForm}>글쓰기</button>
      <button on:click={closeModal}>닫기</button>
    </div>
  </div>
  
  <style>
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
      background-color: #fefefe;
      padding: 20px;
      border-radius: 10px;
      max-width: 600px; /* 최대 너비를 600px로 변경 */
      width: 100%;
    }
    
    h2 {
        text-align: center;
    }
  
    label {
      display: block;
      margin-top: 10px;
    }
  
    input,
    textarea {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
  
    textarea {
      height: 150px; /* 행을 10행에서 15행으로 변경 */
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