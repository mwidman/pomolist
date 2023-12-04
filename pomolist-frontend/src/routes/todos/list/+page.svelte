<script>
    export let data;
</script>

<ul>
{#each data.todos as todo}
    <li><a href='/todos/{todo.id}'>{todo.title}</a></li>
{/each}
</ul>

<form method="POST" action="?/create">
    <label>
        Title:
        <input name="title" type="text" required />
    </label>
    <label>
        Priority:
        <select name="priority">
            <option value="1">P1</option>
            <option value="2">P2</option>
            <option value="3">P3</option>
            <option value="4">P4</option>
        </select>
    </label>
    <label>
        Description:
        <textarea name="description"></textarea>
    </label>
    <button type="submit">Create</button>
</form>

<style>
    li {
        list-style: none;
        border-radius: 0.5em;
        border: 1px solid #000;
        padding: 0.5em;
        margin-bottom: 0.5em;
    }
</style>