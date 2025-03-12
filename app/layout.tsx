import type { Metadata } from 'next';
import { Geist, Geist_Mono, Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Middleman',
	description: 'Connect with your audience through AI.',
	openGraph: {
		type: 'website',
		title: 'Middleman',
		description:
			'The decentralized way to share your story. Middleman creates an AI assistant for your Lukso profile using only the information you want to share, all stored securely on IPFS.',
		images: ['/cover.png'],
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={montserrat.className}
		>
			<body className={`${montserrat.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
