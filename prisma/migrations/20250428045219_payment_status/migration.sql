-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'DONE', 'CANCELED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
