"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchUsers, deleteUser } from "@/lib/actions/userActions";

type User = {
  id: string;
  fullName: string;
  email: string;
  universityId: number;
  createdAt: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null); // Track user being deleted

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
      setLoading(false);
    };

    getUsers();
  }, []);

  const handleDelete = async (id: string) => {
    setDeleting(id); // Set loading state for delete button

    const result = await deleteUser(id);
    if (result.success) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Remove user from state
    } else {
      alert(result.error);
    }

    setDeleting(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-darkBlue-900 mb-4 text-primary-admin">All Users</h2>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-darkBlue-700 text-white">
            <TableRow>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-left">Email</TableHead>
              <TableHead className="text-left">University ID</TableHead>
              <TableHead className="text-left">Created At</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-darkBlue-50">
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.universityId}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                      disabled={deleting === user.id}
                    >
                      {deleting === user.id ? "Deleting..." : "Delete"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
