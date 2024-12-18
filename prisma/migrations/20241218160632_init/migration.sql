-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "category" VARCHAR(100) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);
