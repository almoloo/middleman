import Link from 'next/link';
import React from 'react';
import logo from '@/public/logo.svg';
import Image from 'next/image';
import { signOut } from '@/lib/auth';
import { LogOutIcon } from 'lucide-react';

export default function Header() {
	return (
		<header className="flex items-center justify-between px-5 py-3">
			<Link href="/dashboard">
				<Image
					src={logo}
					alt="Middleman logo"
					className="h-5 w-auto"
				/>
			</Link>
			<form
				action={async () => {
					'use server';
					await signOut();
				}}
			>
				<button
					type="submit"
					className="btn btn-subtle"
				>
					<LogOutIcon className="btn-icon" />
					Sign out
				</button>
			</form>
		</header>
	);
}
