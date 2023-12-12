<script>
    export let data;
</script>

<ul>
{#each data.todos as todo (todo.id)}
    <li class="card w-full shadow-md my-8"><a href='/todos/{todo.id}'>{todo.title}</a></li>
{/each}
</ul>

<hr class="w-full" />
<form method="POST" action="?/create">
    <div class="flex flex-row justify-between items-center">
        <label class="w-1/36" for="todo-title">Title:</label>
        <input id="todo-title" class="inline-block input w-full max-w-lg" name="title" type="text" required placeholder="Short Description" />
        <label>
            Priority:
            <select class="select" name="priority">
                <option value="1">P1</option>
                <option value="2">P2</option>
                <option value="3">P3</option>
                <option value="4">P4</option>
            </select>
        </label>
        </div>
    <label>
        Description:
        <textarea class="textarea w-full" name="description" placeholder="Write details here..."></textarea>
    </label>
    <button class="btn w-full" type="submit">Create</button>
</form>

<style lang="postcss">
</style>