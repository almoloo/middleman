import Alert from '@/components/alert';
import CopyBox from '@/components/copy-box';
import Footer from '@/components/footer';
import Header from '@/components/header';
import NavLink from '@/components/nav-link';
import { auth } from '@/lib/auth';
import { encodeEmail } from '@/lib/utils';
import { ListIcon, NotebookPenIcon } from 'lucide-react';
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
		<div className="flex flex-col grow w-full lg:max-w-[920px] mx-auto">
			<Header />
			<main className="flex flex-col grow mx-5">
				<Alert
					title="Your Widget URL"
					variant="info"
					description="Your personal AI assistant is ready to be added to your
										LUKSO Grid! Below is the unique URL for your Middleman
										widget. Copy this URL and add it to your Universal
										Profile`s Grid to make your assistant available to
										visitors."
					// icon={<LinkIcon className="alert-icon" />}
				>
					<CopyBox
						text={`${
							process.env.NEXT_PUBLIC_DOMAIN
						}/frame/${encodeEmail(session?.user?.email!)}`}
					/>
				</Alert>
				<nav className="flex my-4">
					<NavLink
						text="Training Area"
						url="/dashboard"
						icon={<NotebookPenIcon className="btn-icon" />}
					/>
					<NavLink
						text="Your Data"
						url="/dashboard/data"
						icon={<ListIcon className="btn-icon" />}
					/>
					<div className="grow border-b-2 border-b-neutral-400/10"></div>
				</nav>
				{children}
			</main>
			<Footer />
		</div>
	);
}
