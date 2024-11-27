// Import required modules
"use strict";
const input = require("prompt-sync")({ sigint: true });
const { MongoClient } = require("mongodb");

// MongoDB connection URL
const uri =
  "mongodb+srv://joshuapranata5:291106joshua@tugas.ufflv.mongodb.net/?retryWrites=true&w=majority&appName=tugas/modul";
const dbName = "libraryDB";

// Connect to MongoDB
async function connectToDB() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB!");
  return client.db(dbName);
}

// Add Book to Database
async function addBook(title, category, author, genre, price) {
  const db = await connectToDB();
  const book = { title, category, author, genre, price: parseFloat(price) };
  await db.collection("books").insertOne(book);
  console.log("Book added to database successfully!");
}

// Search for Book by Title
async function searchBook(title) {
  const db = await connectToDB();
  const book = await db.collection("books").findOne({ title });
  if (book) {
    console.log("Book found:", book);
  } else {
    console.log("Book not found.");
  }
}

// Delete Book by Title
async function deleteBook(title) {
  const db = await connectToDB();
  const result = await db.collection("books").deleteOne({ title });
  if (result.deletedCount > 0) {
    console.log("Book deleted successfully!");
  } else {
    console.log("Book not found.");
  }
}

// Show All Books
async function showBooks() {
  const db = await connectToDB();
  const books = await db.collection("books").find().toArray();
  if (books.length === 0) {
    console.log("No books available.");
  } else {
    console.log("Books list:");
    books.forEach((book) => console.log(book));
  }
}

// Search for Book by Price
async function searchBookByPrice(price) {
  const db = await connectToDB();
  const book = await db
    .collection("books")
    .findOne({ price: parseFloat(price) });
  if (book) {
    console.log("Book found:", book);
  } else {
    console.log("Book not found at the specified price.");
  }
}

// Display
async function displayMenu() {
  while (true) {
    console.log("1. Add book");
    console.log("2. Search book");
    console.log("3. Delete book");
    console.log("4. Show all books");
    console.log("5. Search book by price");
    console.log("6. Exit");

    const choice = input("Enter a choice: ");
    switch (choice) {
      case "1":
        const title = input("Title: ");
        const category = input("Category: ");
        const author = input("Author: ");
        const genre = input("Genre: ");
        const price = input("Price: ");
        await addBook(title, category, author, genre, price);
        break;
      case "2":
        const searchedTitle = input("Title of the book to search: ");
        await searchBook(searchedTitle);
        break;
      case "3":
        const deleteTitle = input("Enter the title of the book to delete: ");
        await deleteBook(deleteTitle);
        break;
      case "4":
        await showBooks();
        break;
      case "5":
        const searchPrice = input("Enter the price of the book to search: ");
        await searchBookByPrice(searchPrice);
        break;
      case "6":
        console.log("Exiting...");
        return;
      default:
        console.log("Invalid Choice");
    }
  }
}

displayMenu();
