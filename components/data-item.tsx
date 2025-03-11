import { QAObject } from '@/lib/definitions';

export default function DataItem({ data }: { data: QAObject }) {
	return (
		<div className="flex flex-col gap-1">
			<span className="text-sm font-bold font-serif">
				{data.question}
			</span>
			<span className="pl-3 py-1 border-l-4 border-l-indigo-400/50">
				{data.answer}
			</span>
		</div>
	);
}
