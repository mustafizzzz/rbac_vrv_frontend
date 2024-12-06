import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const Sidebar = ({ isOpen, toggleSidebar, currentPage, setCurrentPage }) => {
	const sidebarItems = [
		{ icon: Home, label: 'Home', path: '/dashboard/home', page: 'home' },
		{ icon: Users, label: 'Users', path: '/dashboard/users', page: 'users' },
		{ icon: Settings, label: 'Settings', path: '/dashboard/settings', page: 'settings' },
	];

	return (

		<div className={`
      fixed left-0 top-0 h-full 
      bg-white border-r 
      transition-all duration-300 
      ${isOpen ? 'w-64' : 'w-20'}
      shadow-lg z-40
    `}>
			<div className="flex flex-col h-full">
				{/* Sidebar Header */}
				<div className="flex items-center justify-between p-4 border-b">
					{isOpen && <h2 className="text-xl font-bold">VRV Security</h2>}
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleSidebar}
						className="ml-auto"
					>
						{isOpen ? <ChevronLeft /> : <ChevronRight />}
					</Button>
				</div>

				{/* Sidebar Navigation */}
				<nav className="flex-1 py-4">
					<TooltipProvider>
						{sidebarItems.map((item, index) => (
							<Tooltip key={index} delayDuration={100} disableHoverableContent={true}>
								<TooltipTrigger asChild>
									<NavLink
										to={item.path}
										end
									>
										<div
											onClick={() => setCurrentPage(item.page)}
											className={`
                      flex items-center 
                      cursor-pointer
                      ${isOpen ? 'px-4' : 'justify-center'}
                      py-3 
                      ${currentPage === item.page ? 'bg-gray-200' : 'hover:bg-gray-100'}
                      transition-colors
                    `}
										>
											<item.icon className="w-5 h-5" />
											{isOpen && (
												<span className="ml-3 text-sm">{item.label}</span>
											)}
										</div>
									</NavLink>
								</TooltipTrigger>
								{!isOpen && (
									<TooltipContent side="right">
										{item.label}
									</TooltipContent>
								)}
							</Tooltip>
						))}
					</TooltipProvider>
				</nav>

			</div>
		</div>
	);
};

export default Sidebar;
