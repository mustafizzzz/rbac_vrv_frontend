import React, { useState, useMemo } from 'react';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

// Dummy data
const dummyResourceData = [
	{
		id: "1",
		name: "Database Access",
		resource: "PostgreSQL Cluster",
		permissions: "READ_WRITE",
		description: "Production database read and write access",
		createdAt: "2024-01-15T10:30:00Z"
	},
	{
		id: "2",
		name: "Kubernetes Cluster",
		resource: "EKS Cluster",
		permissions: "ADMIN",
		description: "Full administration access to Kubernetes cluster",
		createdAt: "2024-02-20T14:45:00Z"
	},
	{
		id: "3",
		name: "S3 Bucket",
		resource: "Data Lake",
		permissions: "READ_ONLY",
		description: "Read-only access to data lake storage",
		createdAt: "2024-03-10T09:15:00Z"
	},
	{
		id: "4",
		name: "CI/CD Pipeline",
		resource: "Jenkins Server",
		permissions: "EXECUTE",
		description: "Permission to trigger and monitor pipelines",
		createdAt: "2024-04-05T11:20:00Z"
	},
	{
		id: "5",
		name: "Monitoring Dashboard",
		resource: "Grafana",
		permissions: "VIEW",
		description: "View-only access to monitoring dashboards",
		createdAt: "2024-05-12T16:55:00Z"
	},
	{
		id: "6",
		name: "API Gateway",
		resource: "AWS API Gateway",
		permissions: "WRITE",
		description: "Write access to API configurations",
		createdAt: "2024-06-18T13:40:00Z"
	},
	{
		id: "7",
		name: "Redis Cache",
		resource: "Elasticache",
		permissions: "READ_WRITE",
		description: "Read and write access to Redis cache",
		createdAt: "2024-07-22T08:25:00Z"
	},
	{
		id: "8",
		name: "Backup System",
		resource: "Backup Storage",
		permissions: "ADMIN",
		description: "Full backup system administration",
		createdAt: "2024-08-30T17:10:00Z"
	},
	{
		id: "9",
		name: "Log Analytics",
		resource: "ELK Stack",
		permissions: "READ_ONLY",
		description: "Read-only access to log analytics",
		createdAt: "2024-09-05T15:35:00Z"
	},
	{
		id: "10",
		name: "Message Queue",
		resource: "RabbitMQ",
		permissions: "EXECUTE",
		description: "Permission to manage message queues",
		createdAt: "2024-10-11T12:50:00Z"
	}
];

// Permission badge color mapping
const permissionBadgeVariant = {
	"READ_WRITE": "warning",
	"ADMIN": "error",
	"READ_ONLY": "success",
	"EXECUTE": "warning",
	"VIEW": "success",
	"WRITE": "primary"
};

const UserPage = () => {
	const [globalFilter, setGlobalFilter] = useState('');
	const [sorting, setSorting] = useState([]);

	const columns = useMemo(() => [
		{
			accessorKey: "name",
			header: "Name",
			cell: info => info.getValue()
		},
		{
			accessorKey: "resource",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Resource
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
			cell: info => info.getValue()
		},
		{
			accessorKey: "permissions",
			header: "Permissions",
			cell: info => (
				<div className="flex justify-center space-x-1">
					<span
						key={info.getValue()}
						className={`text-xs px-2 py-1 rounded 
          ${info.getValue() === 'READ_WRITE' ? 'bg-yellow-100 text-yellow-800' :
								info.getValue() === 'ADMIN' ? 'bg-red-100 text-red-800' :
									info.getValue() === 'READ_ONLY' ? 'bg-green-100 text-green-800' :
										info.getValue() === 'EXECUTE' ? 'bg-yellow-100 text-yellow-800' :
											info.getValue() === 'VIEW' ? 'bg-green-100 text-green-800' :
												info.getValue() === 'WRITE' ? 'bg-blue-100 text-blue-800' :
													'bg-gray-100 text-gray-800'}`}
					>
						{info.getValue()}
					</span>
				</div>

			)
		},
		{
			accessorKey: "description",
			header: "Description",
			cell: info => info.getValue()
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Created At
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
			cell: info => new Date(info.getValue()).toLocaleString()
		},
		{
			id: "actions",
			header: "Actions",
			cell: () => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	], []);

	const table = useReactTable({
		data: dummyResourceData,
		columns,
		state: {
			sorting,
			globalFilter
		},
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 6
			}
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Search resources..."
					value={globalFilter}
					onChange={(event) => setGlobalFilter(event.target.value)}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

export default UserPage;