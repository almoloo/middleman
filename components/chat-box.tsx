'use client';

import QuestionInput from '@/components/question-input';
import TextBubble from '@/components/text-bubble';
import { askQuestion } from '@/lib/actions';
import { useState } from 'react';

export default function ChatBox({ threadId }: { threadId: string }) {
	const [question, setQuestion] = useState<string | null>(null);
	const [answer, setAnswer] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(false);

	const handleSubmit = async (formData: FormData) => {
		const question = formData.get('question');

		if (!question) return;

		setError(false);
		setSubmitting(true);
		setQuestion(null);
		setAnswer(null);
		setQuestion(question.toString());

		try {
			const fetchedAnswer = await askQuestion(
				question.toString(),
				threadId
			);
			if (!fetchedAnswer) throw new Error('Failed to fetch response');

			setAnswer(fetchedAnswer);
		} catch (error) {
			console.error(error);
			setError(true);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<>
			<div className="flex flex-col gap-5 grow justify-center overflow-auto">
				{question && (
					<TextBubble
						text={question}
						type="request"
					/>
				)}
				{(answer || submitting) && (
					<TextBubble
						text={answer ?? undefined}
						type="response"
						error={error}
						loading={submitting}
					/>
				)}
			</div>
			<QuestionInput
				action={handleSubmit}
				loading={submitting}
			/>
		</>
	);
}
