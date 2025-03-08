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
		<form action={handleSubmit}>
			<p>{question}</p>
			<input
				type="text"
				name="answer"
				placeholder="Your answer"
			/>
			<button type="submit">Submit answer</button>
			<button
				type="button"
				onClick={() => handleSkip(question)}
			>
				Skip question
			</button>
		</form>
	);
}
