import { CloudAlert, LoaderPinwheelIcon } from 'lucide-react';

interface TextBubbleProps {
	text?: string;
	type: 'request' | 'response';
	loading?: boolean;
	error?: boolean;
}

export default function TextBubble({
	text,
	type,
	loading,
	error,
}: TextBubbleProps) {
	if (loading) {
		return (
			<div className="flex items-center gap-2">
				<LoaderPinwheelIcon className="w-5 h-5 animate-spin text-neutral-500" />
				<span className="text-sm text-neutral-500 animate-pulse">
					Generating your response...
				</span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center gap-2">
				<CloudAlert className="w-5 h-5 text-rose-400" />
				<span className="text-sm text-rose-500">
					An error has occured, please ask your question again!
				</span>
			</div>
		);
	}

	return (
		<div className={`bubble bubble-${type} active`}>
			<div>{text}</div>
		</div>
	);
}
