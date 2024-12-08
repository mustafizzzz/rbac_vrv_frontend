import React from 'react'

const test = () => {
    const [isDialogAddUserOpen, setIsDialogAddUserOpen] = useState(false);
    return (
        <section className=" dark:bg-gray-900 p-3 sm:p-5">

            <div className="mx-auto max-w-screen-xl px-4 lg:px-2">

                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

                    {/* Upper section */}
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        {/* Search Section */}
                        <div className="w-full md:w-1/2">
                            <form className="flex items-center">
                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required />
                                </div>
                            </form>

                        </div>

                        {/* Action Buttons Section */}
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            {/* Add Product Button */}
                            <Button className="flex items-center"
                                onClick={() => setIsDialogAddUserOpen(true)}
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add User</span>
                            </Button>

                            {/* Add user dialog box */}
                            <AddUser isOpen={isDialogAddUserOpen} setIsOpen={setIsDialogAddUserOpen} />

                            {/* Filter Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center space-x-2">
                                        <span>Filter</span>
                                        <Filter className="h-4 w-4" />

                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Choose Brand</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div className="p-2 space-y-2">
                                        {filterDataUser.map((brand, index) => (
                                            <div key={index} className="flex items-center">
                                                <Checkbox id={brand.toLowerCase()} />
                                                <label
                                                    htmlFor={brand.toLowerCase()}
                                                    className="ml-2 text-sm font-medium"
                                                >
                                                    {brand}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                    </div>

                    {/* Table  section */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">
                                        <Checkbox
                                            checked={selectedRows.size === dummyDataForUser.length}
                                            onCheckedChange={toggleSelectAll}
                                            aria-label="Select all"
                                        />
                                    </th>
                                    <th scope="col" className="px-4 py-3">Name</th>
                                    <th scope="col" className="px-4 py-3">Title</th>
                                    <th scope="col" className="px-4 py-3">Role</th>
                                    <th scope="col" className="px-4 py-3">Status</th>
                                    <th scope="col" className="px-4 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyDataForUser.map((product) => (
                                    <tr key={product.id} className="border-b dark:border-gray-700">
                                        <td className="px-4 py-3">
                                            <Checkbox
                                                checked={selectedRows.has(product.id)}
                                                onCheckedChange={() => toggleSelectRow(product.id)}
                                                aria-label={`Select ${product.name}`}
                                            />
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {product.name}
                                        </td>
                                        <td className="px-4 py-3">{product.title}</td>
                                        <td className="px-4 py-3">{product.role}</td>
                                        <td className="px-4 py-3">{product.status}</td>
                                        <td className="px-4 py-3 flex items-center justify-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="secondary" className="w-10 h-8">
                                                        <MoreHorizontal className="w-5 h-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Bottom section */}
                    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Showing{' '}
                            <span className="font-semibold text-gray-900 dark:text-white">1-10</span>{' '}
                            of{' '}
                            <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                        </span>
                        <ul className="inline-flex items-stretch -space-x-px">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive>
                                            2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </ul>
                    </nav>

                </div>
            </div>
        </section>
    )
}

export default test