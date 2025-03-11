import { LoaderPinwheelIcon } from 'lucide-react';

export default function Loading() {
	// TODO: DESIGN LOADING COMPONENT
	return (
		<div className="w-full h-full grow flex gap-3 items-center justify-center text-neutral-400">
			<LoaderPinwheelIcon className="w-8 h-8 animate-spin" />
			<p className="text-lg font-bold">Loading...</p>
		</div>
	);
}
