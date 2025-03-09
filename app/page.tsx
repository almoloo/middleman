import ConnectButton from '@/components/connect-button';
import { signIn } from '@/lib/auth';

export default function Home() {
	return (
		<article>
			<p>homepage</p>
			<ConnectButton />
		</article>
	);
}
