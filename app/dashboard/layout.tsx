import Footer from '@/components/footer';
import Header from '@/components/header';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	if (!session) {
		redirect('/');
	}
	return (
		<>
			<Header />
			<main className="flex flex-col grow bg-red-100">
				<nav>
					<Link href="/dashboard">Question</Link>
					<Link href="/dashboard/data">Your Data</Link>
				</nav>
				{children}
			</main>
			<Footer />
		</>
	);
}
