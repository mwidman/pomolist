<script>
    export let data;
</script>

<ul>
{#each data.todos as todo}
    <li><a href='/todos/{todo.id}'>{todo.title}</a></li>
{/each}
</ul>

<style>
    li {
        list-style: none;
        border-radius: 0.5em;
        border: 1px solid #000;
        padding: 0.5em;
        margin-bottom: 0.5em;
    }
</style>