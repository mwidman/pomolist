<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';
    
    export let form: ActionData;
</script>

<svelte:head>
  <title>Sign Up</title>
</svelte:head>

<section>
  <form method="post" use:enhance>
    <div class="group">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required />
    </div>
 
    <div class="group">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" required />
    </div>
 
    <div class="submit-container">
      <button type="submit">Sign Up</button>
    </div>

    {#if form?.error} 
      <div class="error">
        {form.error}
      </div>
    {/if}
  </form>
</section>