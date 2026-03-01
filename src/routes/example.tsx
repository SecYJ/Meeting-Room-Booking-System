import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const Home = () => {
	const [numbers, setNumbers] = useState<number[]>([]);

	const handleAddNumber = () => {
		setNumbers((currentNumbers) => [...currentNumbers, Math.floor(Math.random() * 10)]);
	};

	return (
		<main className="flex flex-col gap-16 p-8">
			<h1 className="text-center text-4xl font-bold">TanStack Start Example</h1>
			<div className="mx-auto flex max-w-lg flex-col gap-8">
				<p>Welcome!</p>
				<p>Click the button to append random numbers to local component state.</p>
				<p>
					<button
						className="bg-dark dark:bg-light text-light dark:text-dark rounded-md border-2 px-4 py-2 text-sm"
						onClick={handleAddNumber}
					>
						Add a random number
					</button>
				</p>
				<p>Numbers: {numbers.length === 0 ? "Click the button!" : numbers.join(", ")}</p>
				<p>
					Edit{" "}
					<code className="rounded-md bg-slate-200 px-1 py-0.5 font-mono text-sm font-bold dark:bg-slate-800">
						src/routes/example.tsx
					</code>{" "}
					to change this page
				</p>
				<div className="flex flex-col">
					<p className="text-lg font-bold">Useful resources:</p>
					<div className="flex gap-2">
						<div className="flex w-1/2 flex-col gap-2 lg:w-1/2">
							<ResourceCard
								title="TanStack Start docs"
								description="Learn how TanStack Start routing and server functions work."
								href="https://tanstack.com/start/latest"
							/>
							<ResourceCard
								title="React docs"
								description="Read the latest React docs and core concepts."
								href="https://react.dev/learn"
							/>
						</div>
						<div className="flex w-1/2 flex-col gap-2">
							<ResourceCard
								title="TypeScript handbook"
								description="Review TypeScript essentials, unions, and narrowing."
								href="https://www.typescriptlang.org/docs/handbook/intro.html"
							/>
							<ResourceCard
								title="TanStack Router docs"
								description="Explore route APIs, data loading, and path generation."
								href="https://tanstack.com/router/latest"
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export const Route = createFileRoute("/example")({
	component: Home,
});

type ResourceCardProps = {
	title: string;
	description: string;
	href: string;
};

const ResourceCard = ({ title, description, href }: ResourceCardProps) => {
	return (
		<div className="flex h-28 flex-col gap-2 overflow-auto rounded-md bg-slate-200 p-4 dark:bg-slate-800">
			<a href={href} className="text-sm underline hover:no-underline">
				{title}
			</a>
			<p className="text-xs">{description}</p>
		</div>
	);
};
