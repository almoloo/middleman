import {PinataSDK} from 'pinata-web3';
import {IPFSJSONType, UserInfo} from '@/lib/definitions';
import {createQuestionThread} from './actions';

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
    pinataGatewayKey: process.env.PINATA_GATEWAY_KEY,
});

export const fetchQuestionThread = async (email: string) => {
    const files = await pinata
        .listFiles()
        .keyValue('email', email)
        .keyValue('type', IPFSJSONType.QuestionThread);

    if (files.length === 0) {
        const {threadId} = await createQuestionThread(email);
        return threadId;
    }

    const lastFile = files[files.length - 1];

    const ipfsHash = lastFile.ipfs_pin_hash;

    const file = (await pinata.gateways.get(ipfsHash)).data as any;

    return file.threadId as string;
};

export const fetchUserData = async (email: string) => {
    const files = await pinata
        .listFiles()
        .keyValue('email', email)
        .keyValue('type', IPFSJSONType.UserInfo);

    if (files.length === 0) return null;

    // const lastFile = files[files.length - 1];
    const lastFile = files.reduce((prev, current) =>
        prev &&
        prev.metadata.keyvalues?.version > current.metadata.keyvalues?.version
            ? prev
            : current
    );
    const ipfsHash = lastFile.ipfs_pin_hash;

    const file = (await pinata.gateways.get(ipfsHash)).data as any;

    file.version = lastFile.metadata.keyvalues?.version;
    return file as UserInfo;
};

export const fetchUserDataIPFS = async (email: string) => {
    const files = await pinata
        .listFiles()
        .keyValue('email', email)
        .keyValue('type', IPFSJSONType.UserInfo);

    if (files.length === 0) return null;

    return files.map((file) => {
        return {
            hash: file.ipfs_pin_hash,
            url: pinata.gateways.convert(`ipfs://${file.ipfs_pin_hash}`),
            version: file.metadata.keyvalues?.version || 1
        }
    });
    ;
}
