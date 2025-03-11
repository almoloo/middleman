import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

interface VersionItemProps {
	hash: string;
	url: string;
	version: any;
}

export default function VersionItem({ hash, url, version }: VersionItemProps) {
	return (
		<div className="grid grid-cols-5 items-center gap-3">
			<div className="col-span-1 aspect-square flex flex-col items-center justify-center shrink-0 bg-indigo-400/10 rounded">
				<span className="text-xl font-bold">{version}</span>
				<small className="text-xs text-neutral-500">version</small>
			</div>
			<div className="col-span-4 flex flex-col gap-1">
				<span className="break-words text-xs">ipfs://{hash}</span>
				<Link
					href={url}
					className="flex items-center gap-1 text-xs text-indigo-500 hover:underline"
					target="_blank"
				>
					<ExternalLinkIcon className="w-3 h-3" />
					Open in Browser
				</Link>
			</div>
		</div>
	);
}
