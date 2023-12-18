<script>
    import { createEventDispatcher } from 'svelte';
    import { BACK_ADDR } from '../constants.js';
  
    export let category;
    let name = '';
    let description = '';
    let message = '';

    const dispatch = createEventDispatcher();

    async function createBoard() {
      try {
        const response = await fetch(BACK_ADDR + '/api/board/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category: category,
            name: name,
            description: description
          }),
        });
  
        if (response.ok) {
          message = '게시판이 성공적으로 생성되었습니다.';
          alert(message);
          closeModal();
        } else {
          const errorData = await response.json();
          message = errorData.message || '게시판 생성에 실패했습니다.';
          alert(message);
        }
      } catch (error) {
        console.error('게시판 생성 중 오류 발생:', error);
        alert('네트워크 오류가 발생했습니다.');
      }
    }
  
    function closeModal() {
      dispatch('close');
    }
  </script>
  

<div class="modal">
    <div class="modal-content">
        <h2>스터디 게시판 만들기</h2>
        <input type="text" bind:value={name} placeholder="게시판 이름" />
        <textarea bind:value={description} placeholder="설명"></textarea>
        <button on:click={createBoard}>만들기</button>
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
    }
    
    .modal-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 400px;
        height: 300px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    }
    
    .modal-content > * {
        margin: 10px;
    }
    
    .modal-content > *:first-child {
        margin-top: 0;
    }
    
    .modal-content > *:last-child {
        margin-bottom: 0;
    }
</style>