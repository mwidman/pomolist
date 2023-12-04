import { list, toggleComplete } from '$lib/data';

export async function PUT({ params, request }): Promise<Response> {
    const { completed } = await request.json();
    
    await toggleComplete(params.id, completed)

    return new Response(null, { status: 204 });
}