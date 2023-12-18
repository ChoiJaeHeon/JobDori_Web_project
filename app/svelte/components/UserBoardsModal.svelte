<!-- UserPostsModal.svelte -->
<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
  
    export let boards = [];
    export let selectedModal;
  
    onMount(() => {
      // Close the modal when clicking outside of it
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
        selectedModal = null;
      };
    });
  
    function handleOutsideClick(event) {
      const modalContent = document.querySelector('.modal-content');
      if (modalContent && !modalContent.contains(event.target)) {
        closeModal();
      }
    }
    function closeModal() {
        dispatch('close');
    }
  </script>
  
  <style>
      /* Add your custom styles for the modal */
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
        position: relative; /* Added for relative positioning */
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        max-width: 800px; /* Adjust the maximum width as needed */
        width: 100%;
        box-sizing: border-box;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
    
      h2 {
        text-align: center;
      }
    
      div {
        margin-bottom: 20px;
      }
    
      h3 {
        margin-bottom: 10px;
        font-size: 1.5rem;
      }
    
      p {
        font-size: 1rem;
        color: #333;
        line-height: 1.6;
      }
    
      /* Style for close button */
      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px; /* Increase the font size for better visibility */
        color: #333; /* Set the color to contrast against the background */
        cursor: pointer;
      }
    </style>
  
  <div class="modal">
    <div class="modal-content">
      <!-- Close button -->
      <button class="close-button" on:click={closeModal}>&times;</button>
      
      <h2>My Boards</h2>
      {#each boards as board, index (index)}
    <div>
      <p>{board.boardName}</p>
      <h3>{board.description}</h3>
    </div>
  {/each}
    </div>
  </div>
  