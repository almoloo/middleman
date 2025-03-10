'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({
	text,
	url,
	icon,
}: {
	text: string;
	url: string;
	icon: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<Link
			href={url}
			className={`btn btn-nav ${pathname === url ? 'active' : ''}`}
		>
			{icon}
			{text}
		</Link>
	);
}
