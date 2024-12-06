import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github } from 'lucide-react'

export default function LoginPage() {
	return (

		<div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
			{/* Left Section */}
			<div className="relative hidden bg-black p-10 text-white md:block">
				<div className="flex items-center gap-2">
					<div className="h-8 w-8 rounded-full border-2 border-white" />
					<span className="text-lg font-semibold">Acme Inc</span>
				</div>
				<div className="absolute bottom-10 left-10 right-10 space-y-2">
					<blockquote className="text-2xl font-medium leading-normal">
						"This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before."
					</blockquote>
					<cite className="text-sm font-medium">Sofia Davis</cite>
				</div>
			</div>

			{/* Right Section */}
			<div className="flex items-center justify-center p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Login to your account
						</h1>
						<p className="text-sm text-muted-foreground">
							Enter your email and password below to login
						</p>
					</div>

					<div className="grid gap-6">
						<div className="grid gap-4">
							<Input
								type="email"
								placeholder="name@example.com"
								className="border-input"
							/>
							<Input
								type="password"
								placeholder="••••••••"
								className="border-input"
							/>
							<Button>
								Sign in
							</Button>
						</div>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									OR CONTINUE WITH
								</span>
							</div>
						</div>

						<Button variant="outline" className="gap-2">
							<Github className="h-4 w-4" />
							GitHub
						</Button>
					</div>

					<p className="px-8 text-center text-sm text-muted-foreground">
						Don't have an account yet?{" "}
						<Link href="/signup" className="underline underline-offset-4 hover:text-primary">
							Sign up
						</Link>
					</p>
				</div>
			</div>

			{/* Sign Up Link*/}
			<div className="absolute right-4 top-4 md:right-8 md:top-8">
				<Link
					href="/signup"
					className="text-sm font-medium hover:underline"
				>
					Sign up
				</Link>
			</div>

		</div>
	)
}

