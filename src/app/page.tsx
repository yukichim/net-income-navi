import { SocialInsuranceApp } from "@/components/social-insurance-app";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
	return (
		<HydrateClient>
			<SocialInsuranceApp />
		</HydrateClient>
	);
}
