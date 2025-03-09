import { CoffeeIcon, GithubIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
	return (
		<footer className="flex items-center justify-between px-5 py-3">
			<div className="flex items-center gap-3 text-sm text-neutral-600">
				<CoffeeIcon className="h-5 w-5" />
				<p>
					Designed & Developed by{' '}
					<Link
						href="https://github.com/almoloo"
						className="text-indigo-500 hover:underline cursor-pointer"
						target="_blank"
					>
						Almoloo
					</Link>
				</p>
			</div>
			<Link
				href="https://github.com/almoloo/middleman"
				className="hover:cursor-pointer p-2 rounded-full bg-indigo-400 text-white"
				target="_blank"
			>
				<GithubIcon className="h-5 w-5" />
			</Link>
		</footer>
	);
}
