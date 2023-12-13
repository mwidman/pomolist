import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../login/$types';
import { createUser } from '../../database/domains/users/methods';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const email = <string>data.get('email');
        const password = <string>data.get('password');

        if (!email || !password) {
            return fail(400, {
                error: 'Missing email or password'
            });
        }

        try {
            // Intentionally not done through API.
            await createUser(email, password);
        } catch (err) {
            return fail(500, {
                error: 'Failed to create new user'
            });
        }

        throw redirect(302, '/login');
    }
};