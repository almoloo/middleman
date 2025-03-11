import { auth } from '@/lib/auth';
import { fetchUserData, fetchUserDataIPFS } from '@/lib/data';
import DataList from '@/components/data-list';
import VersionItem from '@/components/version-item';

export default async function DataPage() {
	const session = await auth();
	const userData = await fetchUserData(session?.user?.email!);
	const userDataIPFS = await fetchUserDataIPFS(session?.user?.email!);

	return (
		<div className="flex flex-col md:grid md:grid-cols-6 gap-5">
			<section className="md:col-span-4">
				<h2 className="text-lg font-bold">Your Current Information</h2>
				<p className="text-sm text-neutral-500">
					These are the questions and answers that train your AI
					assistant.
				</p>
				<div className="mt-3">
					<DataList data={userData?.data ?? []} />
				</div>
			</section>

			<section className="md:col-span-2">
				<h2 className="text-lg font-bold">Version History</h2>
				<p className="text-sm text-neutral-500">
					All uploaded versions of your data that are publicly
					available on IPFS.
				</p>
				<div className="flex flex-col gap-3 mt-3">
					{userDataIPFS &&
						userDataIPFS.map((data, index) => (
							<VersionItem
								key={index}
								hash={data.hash}
								url={data.url as unknown as string}
								version={data.version}
							/>
						))}
				</div>
			</section>
		</div>
	);
}
