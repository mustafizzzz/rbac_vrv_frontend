import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';


const Navbar = ({ isOpen }) => {


	return (
		<nav
			className={`fixed top-0 left-0 right-0 bg-white shadow-md z-30 transition-all duration-300 
                ${isOpen ? 'ml-64' : 'ml-20'
				}`}
		>
			<div className="flex items-center h-16 px-8">
				<div className="flex items-center space-x-4">
					<h1 className="text-xl font-semibold">Dashboard</h1>
				</div>

				<div className="ml-auto flex items-center space-x-5">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">Notifications</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-48">
							<DropdownMenuLabel>Notifications</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<span className='p-2'>No Notifications</span>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>

					<div className="flex items-center">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div className="cursor-pointer">
									<Avatar>
										<AvatarImage src="https://github.com/shadcn.png" />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuLabel>Profile</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Account Settings</DropdownMenuItem>
								<DropdownMenuItem>Log Out</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Help</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

				</div>

			</div>
		</nav >
	);
};

export default Navbar;