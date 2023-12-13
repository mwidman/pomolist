import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { loginUser } from '../../database/domains/users/methods';

export const load = (async ({ locals }) => {
    const user = locals.user;
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        
        const email = <string>formData.get('email');
        const password = <string>formData.get('password');

        if (!email || !password) {
            return fail(400, {
                error: 'Missing email or password'
            });
        }

        const { error, token } = await loginUser(email, password);

        if (error) {
            return fail(401, {
                error
            });
        }

        cookies.set('AuthorizationToken', `Bearer ${token}`, {
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,  // 1 day
        });

        throw redirect(302, '/todos/list');
    }
}