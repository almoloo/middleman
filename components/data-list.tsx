import { QAObject } from '@/lib/definitions';
import DataItem from '@/components/data-item';

export default function DataList({ data }: { data: QAObject[] }) {
	return (
		<div className="flex flex-col gap-3">
			{data.map((data, index) => (
				<DataItem
					data={data}
					key={index}
				/>
			))}
		</div>
	);
}
