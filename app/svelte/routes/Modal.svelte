<script>
    export let category;
    export let onclose;
  
    let title = '';
    let content = '';
  
    function submit() {
      // 여기에서 실제 데이터를 서버에 전송하는 로직을 추가해야 합니다.
      // 이 예제에서는 간단하게 콘솔에 출력만 하도록 했습니다.
      console.log('Submit:', { category, title, content });
  
      // 모달 닫기
      close();
    }
  
    function close() {
      // 부모 컴포넌트로 닫기 이벤트 전달
      onclose();
    }
  </script>
  
  <div class="modal">
    <div class="modal-content">
      <span class="close" on:click={close}>&times;</span>
      <h2>{category} 스터디 글 작성</h2>
  
      <label for="title">제목:</label>
      <input type="text" bind:value={title} id="title">
  
      <label for="content">내용:</label>
      <textarea bind:value={content} id="content"></textarea>
  
      <button on:click={submit}>글 작성</button>
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
      max-width: 400px;
      width: 100%;
    }
  
    .close {
      float: right;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
  
    label {
      display: block;
      margin-top: 10px;
    }
  
    input, textarea {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
      margin-bottom: 10px;
      box-sizing: border-box;
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

    .close {
    float: right;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 10px;
  }
  </style>
  