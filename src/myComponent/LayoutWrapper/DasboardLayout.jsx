import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';


const DashboardLayout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [currentPage, setCurrentPage] = useState('users');

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className="flex min-h-screen">
			<Sidebar
				isOpen={sidebarOpen}
				toggleSidebar={toggleSidebar}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
			<div
				className={`
          ml-20 
          ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} 
          mt-16 
          p-4 
          transition-all 
          duration-300 
          flex-1
        `}
			>
				{children ? children : <Outlet />}
			</div>

			<Navbar isOpen={sidebarOpen} />
		</div>
	);
};

export default DashboardLayout;