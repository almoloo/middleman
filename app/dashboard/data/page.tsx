import {auth} from '@/lib/auth';
import {fetchUserData, fetchUserDataIPFS} from '@/lib/data';
import DataItem from "@/components/data-item";

export default async function DataPage() {
    const session = await auth();
    const userData = await fetchUserData(session?.user?.email!);
    const userDataIPFS = await fetchUserDataIPFS(session?.user?.email!);

    return (
        <div>
            {
                userData?.data.map((data, index) => (
                    <DataItem data={data} key={index}/>
                ))
            }
            <hr/>
            {
                userDataIPFS && userDataIPFS.map((data, index) => (
                    <div key={index}>
                        {data.version} - {data.hash} - {data.url}
                    </div>
                ))
            }
        </div>
    );
}
