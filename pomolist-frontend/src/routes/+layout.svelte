<script lang="ts">
    import type { LayoutData } from './$types';
    import "../app.css"

    export let data: LayoutData;
</script>

<nav>
    <a href='/login'>Login</a>
    <a href='/signup'>Sign Up</a>
</nav>
<slot />