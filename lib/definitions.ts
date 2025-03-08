export enum IPFSJSONType {
	'QuestionThread' = 1,
	'UserInfo' = 2,
}

export type QAObject = {
	question: string;
	answer: string;
};

export interface UserInfo {
	data: QAObject[];
	skipped: string[];
	version?: number;
}
