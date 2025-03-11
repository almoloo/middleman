import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.svg';

export default function FrameLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<article className="flex flex-col grow p-5">
			<header>
				<Link
					href={process.env.NEXT_PUBLIC_DOMAIN!}
					target="_blank"
				>
					<Image
						src={Logo}
						alt="middleman logo"
						className="h-4 mx-auto"
					/>
				</Link>
			</header>
			<main className="flex flex-col grow">{children}</main>
		</article>
	);
}
