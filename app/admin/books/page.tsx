"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getBooks, deleteBook } from "@/lib/actions/book";
// import { IKImage } from "imagekitio-next";
// import config from "@/lib/config"; // Ensure this contains `imagekit.urlEndpoint`
import Link from "next/link";

type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  totalCopies: number;
  availableCopies: number;
  createdAt: string; // Ensured this is always a string
};

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id: string) => {
    setDeleting(id);

    const result = await deleteBook(id);
    if (result.success) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } else {
      alert(result.error);
    }

    setDeleting(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-primary-admin">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-darkBlue-700 text-white">
            <TableRow>
              {/* <TableHead>Cover</TableHead> */}
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  Loading books...
                </TableCell>
              </TableRow>
            ) : books.length > 0 ? (
              books.map((book) => (
                <TableRow key={book.id} className="hover:bg-darkBlue-50">
                  {/* <TableCell>
                    {book.coverUrl ? (
                      <IKImage
                        path={book.coverUrl} // Make sure this is a valid ImageKit path
                        urlEndpoint={config.env.imagekit.urlEndpoint}
                        alt={book.title}
                        transformation={[{ width: "50", height: "75" }]} // Resize with ImageKit
                        className="rounded-md"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-gray-500">No Cover</span>
                    )}
                  </TableCell> */}
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.rating} ⭐</TableCell>
                  <TableCell>
                    {book.availableCopies} / {book.totalCopies}
                  </TableCell>
                  <TableCell className="text-center flex gap-2 mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/books/edit/${book.id}`}>Edit</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(book.id)}
                      disabled={deleting === book.id}
                    >
                      {deleting === book.id ? "Deleting..." : "Delete"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  No books found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Books;
