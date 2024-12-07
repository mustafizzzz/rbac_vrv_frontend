import React, { useState } from 'react';
import { CheckCircle2, XCircle, Edit2, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const TableModel = () => {
    const [permissions, setPermissions] = useState([
        {
            id: 'product_api',
            name: 'Product API',
            resource: 'Products',
            availablePermissions: ['read', 'write', 'delete'],
            description: 'Manage product-related operations'
        },
        {
            id: 'order_api',
            name: 'Order API',
            resource: 'Orders',
            availablePermissions: ['read', 'create', 'update'],
            description: 'Manage order-related operations'
        }
    ]);

    const [roles, setRoles] = useState([
        {
            id: 'admin',
            name: 'Admin',
            description: 'Full system access',
            status: 'active',
            assignedPermissions: {
                'product_api': ['read', 'write', 'delete'],
                'order_api': ['read', 'create', 'update']
            },
            createdAt: '2024-06-06'
        },
        {
            id: 'manager',
            name: 'Manager',
            description: 'Limited system access',
            status: 'active',
            assignedPermissions: {
                'product_api': ['read', 'write'],
                'order_api': ['read', 'create']
            },
            createdAt: '2024-06-07'
        }
    ]);

    return (
        <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-2 gap-6">
                {/* Permissions Table */}
                <div className="bg-white shadow-md rounded-lg">
                    <div className="bg-gray-100 px-6 py-4 border-b flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Permissions</h2>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                            Add Permission
                        </button>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm">
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Resource</th>
                                <th className="px-4 py-3 text-center">Available Permissions</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.map((perm) => (
                                <tr key={perm.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3">{perm.name}</td>
                                    <td className="px-4 py-3">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                            {perm.resource}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center space-x-1">
                                            {perm.availablePermissions.map((p) => (
                                                <span
                                                    key={p}
                                                    className={`text-xs px-2 py-1 rounded 
                            ${p === 'read' ? 'bg-green-100 text-green-800' :
                                                            p === 'write' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'}`}
                                                >
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{perm.description}</td>
                                    <td className="px-4 py-3 flex justify-center space-x-2">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Roles Table */}
                <div className="bg-white shadow-md rounded-lg">
                    <div className="bg-gray-100 px-6 py-4 border-b flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Roles</h2>
                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                            Add Role
                        </button>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm">
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-center">Status</th>
                                <th className="px-4 py-3 text-left">Assigned Permissions</th>
                                <th className="px-4 py-3 text-left">Created At</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => (
                                <tr key={role.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">{role.name}</td>
                                    <td className="px-4 py-3 text-gray-600">{role.description}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`text-xs px-2 py-1 rounded 
                      ${role.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {role.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {Object.entries(role.assignedPermissions).map(([api, perms]) => (
                                            <div key={api} className="mb-1">
                                                <span className="text-sm font-semibold text-gray-700">{api}</span>
                                                <div className="flex space-x-1 mt-1">
                                                    {perms.map((p) => (
                                                        <span
                                                            key={p}
                                                            className={`text-xs px-2 py-1 rounded 
                                ${p === 'read' ? 'bg-green-100 text-green-800' :
                                                                    p === 'write' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-red-100 text-red-800'}`}
                                                        >
                                                            {p}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{role.createdAt}</td>
                                    <td className="px-4 py-3 flex justify-center space-x-2">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="space-y-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
            </div>
        </div>
    );
};

export default TableModel;