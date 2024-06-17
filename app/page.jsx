import Image from "next/image";
import List from "./components/list";
import { LIMIT } from "./consts/const";

export default function Home(p) {
	const { searchParams } = p
	const currentPage = Number(searchParams?.page) || 0;
	return <main className="flex min-h-screen flex-col p-10 bg-slate-500">
		<List offset={currentPage * LIMIT} />
	</main>;
}
