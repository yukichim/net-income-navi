import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
	title: "手取りナビ - 社会保険料計算アプリ",
	description: "4月〜6月の給与から社会保険料を簡単計算。都道府県別の保険料率に対応した正確な手取り金額シミュレーション。",
	keywords: ["社会保険料", "計算", "手取り", "給与", "年金", "健康保険", "介護保険"],
	authors: [{ name: "手取りナビ" }],
	openGraph: {
		title: "手取りナビ - 社会保険料計算アプリ",
		description: "4月〜6月の給与から社会保険料を簡単計算。都道府県別の保険料率に対応した正確な手取り金額シミュレーション。",
		type: "website",
		locale: "ja_JP",
	},
	twitter: {
		card: "summary_large_image",
		title: "手取りナビ - 社会保険料計算アプリ",
		description: "4月〜6月の給与から社会保険料を簡単計算。都道府県別の保険料率に対応した正確な手取り金額シミュレーション。",
	},
	viewport: "width=device-width, initial-scale=1",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="ja" className={`${geist.variable}`}>
			<body className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</body>
		</html>
	);
}
