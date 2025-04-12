import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import mime from "mime-types";
import fs from 'fs';

class S3Storage {
    private client: S3Client;

    constructor() {
        this.client = new S3Client({
            region: process.env.AMAZON_S3_REGION,
            credentials: {
                accessKeyId: process.env.AMAZON_S3_KEY!,
                secretAccessKey: process.env.AMAZON_S3_SECRET!,
            },
        });
    }

    async saveFile(filename: string): Promise<void> {
        const originalPath = path.resolve("./public/tmp/course", filename);
        const ContentType = mime.lookup(originalPath);

        if (!ContentType) {
            throw new Error('File not found');
        }

        const fileContent = await fs.promises.readFile(originalPath);

        const command = new PutObjectCommand({
            Bucket: process.env.AMAZON_S3_BUCKET!,
            Key: filename,
            Body: fileContent,
            ContentType,
        });

        await this.client.send(command);

        await fs.promises.unlink(originalPath);
    }

    async deleteFile(filename: string): Promise<void> {
        const command = new DeleteObjectCommand({
            Bucket: process.env.AMAZON_S3_BUCKET!,
            Key: filename,
        });

        await this.client.send(command);
    }
}

export default S3Storage;
