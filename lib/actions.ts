'use server';

import { PinataSDK } from 'pinata-web3';
import OpenAI from 'openai';
import { TextContentBlock } from 'openai/resources/beta/threads/messages.mjs';
import { IPFSJSONType, QAObject, UserInfo } from '@/lib/definitions';
import { fetchUserData } from '@/lib/data';

const pinata = new PinataSDK({
	pinataJwt: process.env.PINATA_JWT,
	pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
	pinataGatewayKey: process.env.PINATA_GATEWAY_KEY,
});

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const createQuestionThread = async (email: string) => {
	const thread = await openai.beta.threads.create();
	const ipfs = await pinata.upload.json(
		{
			threadId: thread.id,
		},
		{
			metadata: {
				keyValues: {
					email,
					type: IPFSJSONType.QuestionThread,
				},
			},
		}
	);
	return {
		threadId: thread.id,
		ipfs: ipfs.IpfsHash,
	};
};

export const generateQuestions = async (
	threadId: string,
	providedData?: QAObject[],
	skipped?: string[],
	numberOfQuestions?: number
) => {
	const thread = await openai.beta.threads.retrieve(threadId);
	let prompt = '';

	if (providedData) {
		prompt = `Here are my previous Q&As: ${JSON.stringify(providedData)}. `;
	}

	if (skipped) {
		prompt += `Here are skipped questions: ${JSON.stringify(skipped)}. `;
	}

	prompt += `Generate ${
		numberOfQuestions ? numberOfQuestions : '10'
	} questions for my profile.`;

	const message = await openai.beta.threads.messages.create(thread.id, {
		role: 'user',
		content: prompt,
	});

	let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
		assistant_id: process.env.OPENAI_GENERATE_QUESTIONS_ASSISTANT!,
		instructions: `Ask for the user's full name if you haven't asked already. Respond in plain JSON in the format {questions: string[]}. no extra content.`,
	});

	if (run.status === 'completed') {
		const messages = await openai.beta.threads.messages.list(run.thread_id);
		const messageBlock = messages.data[0].content[0] as TextContentBlock;
		console.log('🎈', messageBlock);
		const questions = messageBlock.text.value;
		console.log('🎈', questions);
		return JSON.parse(questions) as { questions: string[] };
	} else if (run.status === 'failed') {
		throw new Error('Failed to generate new questions, please try again.');
	}
};

export const updateUserData = async (email: string, data: UserInfo) => {
	const prevData = await fetchUserData(email);
	let newData = data;
	let version = 1;

	if (prevData) {
		newData.data = prevData.data.concat(data.data);
		newData.skipped = prevData.skipped.concat(data.skipped);
		version = prevData.version ? prevData.version + 1 : 1;
		newData.version = version;
	}

	const upload = await pinata.upload.json(newData, {
		metadata: {
			keyValues: {
				email,
				version,
				type: IPFSJSONType.UserInfo,
			},
		},
	});

	return {
		data: newData,
		ipfs: upload.IpfsHash,
	};
};
