<script>
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

          await fetch(`/todos/${data.todo.slug}`, {
            method: 'PUT',
            body: JSON.stringify({ completed }),
            headers: {
              'Content-type': 'application/json'
            }
          });
        }}>
    </label>
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