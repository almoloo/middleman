import ConnectButton from '@/components/connect-button';
import { signIn } from '@/lib/auth';

export default function Home() {
	return (
		<div>
			<p>homepage</p>
			<ConnectButton />
		</div>
	);
}
