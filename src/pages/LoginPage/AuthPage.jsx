import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo_vrv from "@/assets/logo_vrv.ico"
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signUpSchema } from "@/utils/authValidation";
import { Loader2 } from "lucide-react"
import axios from "axios";
import { UserContext } from "@/contexAPI/UserContex";

export default function AuthPage() {
	const [isSignUp, setIsSignUp] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { currentUser, setCurrentUser } = useContext(UserContext)



	// Define the form validation schema
	const { register, handleSubmit, formState: { errors }, reset } = useForm({
		resolver: zodResolver(isSignUp ? signUpSchema : loginSchema),
	});

	const toggleForm = () => {
		reset();
		setIsSignUp(!isSignUp);
	};

	const onSubmit = async (data) => {
		setLoading(true);
		console.log(import.meta.env.VITE_API_END_POINT);

		try {
			const endpoint = isSignUp
				? `${import.meta.env.VITE_API_END_POINT}/users/register`
				: `${import.meta.env.VITE_API_END_POINT}/users/login`;

			const response = await axios.post(endpoint, data);

			console.log(response.data);
			alert("Form submitted successfully!");
			if (response.data.success) {
				setCurrentUser(response.data.data);
				if (isSignUp) {
					// Navigate to OTP verification after successful registration
					alert("Registration successful! Redirecting to OTP verification...");
					navigate("/otp-verify");
				} else {
					// Login flow: Check if user is verified
					if (response.data.data.isVerified === false) {
						alert("Your account is not verified. Redirecting to OTP verification...");
						navigate("/otp-verify");
					} else {
						alert("Login successful! Redirecting to home page...");
						navigate("/dashboard/users");
					}
				}
			} else {
				alert(response.data.message || "An error occurred. Please try again.");
			}


		} catch (error) {
			console.error(error);
			alert("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};



	return (
		<div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
			{/* Left Section */}
			<div className="relative hidden bg-black p-5 text-white md:block">
				<div className="flex items-center gap-2">
					<img
						src={logo_vrv}
						alt="VRV Security Logo"
						className="h-12 w-12 rounded-full"
					/>
					<span className="text-lg font-bold">VRV Security</span>
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
							{isSignUp ? "Create an Account" : "Login to your account"}
						</h1>
						<p className="text-sm text-muted-foreground">
							{isSignUp
								? "Enter your details below to sign up"
								: "Enter your email and password below to login"}
						</p>
					</div>

					<div className="grid gap-6">
						<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
							{isSignUp && (
								<Input
									type="text"
									placeholder="Username"
									className="border-input"
									{...register("username")}
								/>
							)}
							{isSignUp && errors.username && (
								<span className="text-gray-400 text-xs">{errors.username.message}</span>
							)}

							<Input
								type="email"
								placeholder="name@example.com"
								className="border-input"
								{...register("email")}
							/>
							{errors.email && (
								<span className="text-gray-400 text-xs">{errors.email.message}</span>
							)}

							<Input
								type="password"
								placeholder="••••••••"
								className="border-input"
								{...register("password")}
							/>
							{errors.password && (
								<span className="text-gray-400 text-xs">{errors.password.message}</span>
							)}

							{isSignUp && (
								<Input
									type="password"
									placeholder="Confirm password"
									className="border-input"
									{...register("confirmPassword")}
								/>
							)}
							{isSignUp && errors.confirmPassword && (
								<span className="text-gray-400 text-xs">
									{errors.confirmPassword.message}
								</span>
							)}

							<Button type="submit" disabled={loading}>
								{loading ? (
									<>
										<Loader2 className="animate-spin" />
										Please wait
									</>
								) : (
									isSignUp ? "Sign up" : "Sign in"
								)}
							</Button>
						</form>
					</div>

					<p className="px-8 text-center text-sm text-muted-foreground">
						{isSignUp ? (
							<>
								Already have an account?{" "}
								<Link
									onClick={toggleForm}
									className="underline underline-offset-4 hover:text-primary"
								>
									Login here
								</Link>
							</>
						) : (
							<>
								Don't have an account yet?{" "}
								<Link
									onClick={toggleForm}
									className="underline underline-offset-4 hover:text-primary"
								>
									Sign up
								</Link>
							</>
						)}
					</p>
				</div>
			</div>

			{/* Sign Up / Login Link */}
			<div className="absolute right-4 top-4 md:right-8 md:top-8">
				<Link
					onClick={toggleForm}
					className="text-sm font-medium hover:underline"
				>
					{isSignUp ? "Login" : "Sign up"}
				</Link>
			</div>
		</div>

	);
}
