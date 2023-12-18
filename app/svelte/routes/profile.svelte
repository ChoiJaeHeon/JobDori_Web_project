<script>
  import { onMount } from 'svelte';
  import { BACK_ADDR } from '../constants.js';

  let userInfo = {
    nickname: '',
    profileImage: 'path/to/default/profile-image.jpg', // Default profile image path
  };

  let posts = []; // Array to store user's posts
  let comments = []; // Array to store user's comments
  let boards = []; // Array to store user's boards

  let isPostsVisible = false;
  let isCommentsVisible = false;
  let isBoardsVisible = false;

  // Fetch user information when the component is mounted
  onMount(async () => {
    // Simulate fetching user information from an API
    await fetchUserData();
    // Simulate fetching user's posts, comments, and boards
    posts = await fetchUserPosts(); // Replace with actual API call
    comments = await fetchUserComments(); // Replace with actual API call
    boards = await fetchUserBoards(); // Replace with actual API call
  });

  // Function to fetch user's posts from an API
  async function fetchUserPosts() {
    try {
      const response = await fetch(BACK_ADDR + '/api/user/my/posts');

      if (response.ok) {
        const postData = await response.json();
        return postData; // Update with the actual key in your response
      } else {
        console.log('Failed to fetch user posts. Status:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
      return [];
    }
  }

  // Function to fetch user's comments from an API
  async function fetchUserComments() {
    try {
      const response = await fetch(BACK_ADDR + '/api/user/my/comments');

      if (response.ok) {
        const commentData = await response.json();
        return commentData; // Update with the actual key in your response
      } else {
        console.log('Failed to fetch user comments. Status:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching user comments:', error);
      return [];
    }
  }

  // Function to fetch user's boards from an API
  async function fetchUserBoards() {
    try {
      const response = await fetch(BACK_ADDR + '/api/user/my/boards');

      if (response.ok) {
        const boardData = await response.json();
        return boardData; // Update with the actual key in your response
      } else {
        console.log('Failed to fetch user boards. Status:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching user boards:', error);
      return [];
    }
  }

  // Function to navigate to user's posts page
  function togglePosts() {
    isPostsVisible = !isPostsVisible;
    // Reset visibility for other sections
    isCommentsVisible = false;
    isBoardsVisible = false;
  }

  // Function to navigate to user's comments page
  function toggleComments() {
    isCommentsVisible = !isCommentsVisible;
    // Reset visibility for other sections
    isPostsVisible = false;
    isBoardsVisible = false;
  }

  // Function to navigate to user's boards page
  function toggleBoards() {
    isBoardsVisible = !isBoardsVisible;
    // Reset visibility for other sections
    isPostsVisible = false;
    isCommentsVisible = false;
  }

  // Function to fetch user information from an API
  async function fetchUserData() {
    try {
      const response = await fetch(BACK_ADDR + '/api/user/my/info', {
        method: 'GET',
        headers: {
          // Include any headers needed for authentication
          'Content-Type': 'application/json',
          // Add any other necessary headers
        },
      });

      if (response.ok) {
        const userData = await response.json();
        // Update user information in the component state
        userInfo = {
          nickname: userData.name,
          profileImage: userData.profileUrl,
        };
      } else if (response.status === 401) {
        // Handle unauthorized (e.g., redirect to login)
        console.log('Unauthorized. Redirecting to login...');
      } else {
        console.log('Failed to fetch user information. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  }
</script>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  section {
    margin-bottom: 30px;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  div {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    color: #333;
    margin-bottom: 20px;
  }
</style>

<main>
  <section>
    <h1>{userInfo.nickname}'s Profile</h1>
    <img src={userInfo.profileImage} alt="Profile Image" />
  </section>

  <section>
    <h2>My Posts</h2>
    <button on:click={togglePosts}>Toggle My Posts</button>
    {#if isPostsVisible}
      {#each posts as post, index (index)}
        <div>
          <p>{post.boardName}</p>
          <h3>{post.title}</h3>
        </div>
      {/each}
    {/if}
  </section>

  <section>
    <h2>My Comments</h2>
    <button on:click={toggleComments}>Toggle My Comments</button>
    {#if isCommentsVisible}
      {#each comments as comment, index (index)}
        <div>
          <p>{comment.boardName}</p>
          <h3>{comment.content}</h3>
        </div>
      {/each}
    {/if}
  </section>

  <section>
    <h2>My Boards</h2>
    <button on:click={toggleBoards}>Toggle My Boards</button>
    {#if isBoardsVisible}
      {#each boards as board, index (index)}
        <div>
          <p>{board.boardName}</p>
          <h3>{board.description}</h3>
        </div>
      {/each}
    {/if}
  </section>
</main>
