import { LoaderPinwheelIcon } from 'lucide-react';

export default function Loading() {
	return (
		<div className="grow flex items-center justify-center gap-3">
			<LoaderPinwheelIcon className="w-6 h-6 animate-spin" />
			<span className="animate-pulse">Loading Assistant...</span>
		</div>
	);
}
