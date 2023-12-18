<script>
  import { link } from "svelte-spa-router";
  // 스크립트 부분은 수정 없음
</script>

<footer class="footer">
  <div class="footer-container">
    <div class="footer-column">
      <h3>채용공고</h3>
      <ul>
        <li><a use:link href="/recruitboard">채용공고 모아보기</a></li>
        <!-- 다른 항목들도 비슷하게 추가 -->
      </ul>
    </div>

    <div class="footer-column">
      <h3>멘토링 / 스터디</h3>
      <ul>
        <li><a use:link href="/studyboard">스터디 모집</a></li>
        <li><a use:link href="/studyboard">멘토링 자원</a></li>
        <li><a use:link href="/studyboard">멘토링 구인</a></li>
        <!-- 다른 항목들도 비슷하게 추가 -->
      </ul>
    </div>

    <div class="footer-column">
      <h3>게시판</h3>
      <ul>
        <li><a use:link href="/freeboard">자유게시판</a></li>
        <li><a use:link href="/questionboard">질문게시판</a></li>
        <li><a use:link href="/columnboard">칼럼게시판</a></li>
        <!-- 다른 항목들도 비슷하게 추가 -->
      </ul>
    </div>
  </div>
  <!-- 아이콘 부분은 그대로 두거나 필요에 따라 수정 -->
</footer>

<style>
  .footer {
    background-color: #000;
    color: white;
    padding: 20px;
    margin-top: 80px;
  }

  .footer-container {
    display: flex;
    justify-content: space-around;
    max-width: 1200px; 
    margin: 0 auto;
  }

  .footer-column {
    width: 30%; 
    text-align: center; 
  }

  .footer-column h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .footer-column ul {
    font-size: 14px;
    list-style: none;
    padding: 0;
  }

  .footer-column li {
    margin-bottom: 10px;
  }

  a {
    color: white;
    text-decoration: none;
  }

  .footer-column a {
    color: rgba(255, 255, 255, 0.8); /* 투명한 흰색 */
    text-decoration: none;
    position: relative; /* 포지션 상대적으로 설정 */
  }

  .footer-column a:hover {
    color: #fff; /* 마우스를 올렸을 때 글자색 변경 */
  }
</style>
