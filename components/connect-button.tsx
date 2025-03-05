import { auth, signIn } from '@/lib/auth';
import Link from 'next/link';
import React from 'react';

export default async function ConnectButton() {
	const session = await auth();

	if (!session?.user) {
		// RETURN CONNECT BUTTON
		return (
			<form
				action={async () => {
					'use server';
					await signIn();
				}}
			>
				<button type="submit">Sign in</button>
			</form>
		);
	} else {
		// RETURN DASHBOARD LINK
		return <Link href="/dashboard">Go to Dashboard</Link>;
	}
}
