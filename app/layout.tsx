import type { Metadata } from 'next';
import { Geist, Geist_Mono, Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
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
