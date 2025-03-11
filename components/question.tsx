import { QAObject } from '@/lib/definitions';

export default function Question({
	question,
	addAnswer,
	skipQuestion,
}: {
	question: string;
	addAnswer: (item: QAObject) => void;
	skipQuestion: (q: string) => void;
}) {
	const handleSubmit = (formData: FormData) => {
		const answer = formData.get('answer');

		if (!answer) return;

		addAnswer({
			question,
			answer: answer.toString(),
		});
	};

	const handleSkip = (q: string) => {
		skipQuestion(q);
	};

	return (
		<form
			action={handleSubmit}
			className="flex flex-col border border-neutral-400/50 rounded-lg p-3 gap-2"
		>
			<blockquote className="text-xl font-bold font-serif">
				{question}
			</blockquote>
			<textarea
				name="answer"
				placeholder="Type your answer here..."
				className="bg-white/90 border-l-4 border-l-indigo-400/20 p-2"
				required
			></textarea>
			<div className="flex justify-end gap-1">
				<button
					type="button"
					className="btn btn-subtle btn-sm"
					onClick={() => handleSkip(question)}
				>
					Skip
				</button>
				<button
					type="submit"
					className="btn btn-primary btn-sm"
				>
					Next Question
				</button>
			</div>
		</form>
	);
}
