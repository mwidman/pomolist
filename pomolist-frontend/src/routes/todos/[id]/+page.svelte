<script>
  import { enhance } from '$app/forms';
  export let data;

</script>

<div class="container">
  <div class="header">
    <h1 class="title">{ data.todo.title }</h1>
    <div class="priority">P{ data.todo.priority }</div>
  </div>
  <p>{ data.todo.description }</p>
  <form class="complete" method="PUT" action="?/markComplete">
    <label>
      Complete: 
      <input type="checkbox" 
        checked={data.todo.completed}
        on:change={async (e) => {
          const completed = e.currentTarget.checked;

          await fetch(`/api/todos/${data.todo.id}`, {
            method: 'PUT',
            body: JSON.stringify({ completed }),
            headers: {
              'Content-type': 'application/json'
            }
          });
        }}>
    </label>
  </form>
  <form method="POST" action="?/delete">
    <input type="hidden" name="id" value={ data.todo.id } />
    <button>&#x1F5D1;</button>
  </form>
</div>

<style>
  .container {
    border-radius: 0.5em;
    border: 1px solid #000;
    padding: 0.5em;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .priority {
    font-size: 2em;
    font-weight: bold;
  }

  .complete {
    text-align: right;
  }

</style>