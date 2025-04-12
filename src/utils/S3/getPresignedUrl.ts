import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getPresignedUrl(fileName: string) {
    const client = new S3Client({
        region: process.env.AMAZON_S3_REGION,
        credentials: {
            accessKeyId: process.env.AMAZON_S3_KEY!,
            secretAccessKey: process.env.AMAZON_S3_SECRET!,
        },
    });

    const command = new GetObjectCommand({
        Bucket: process.env.AMAZON_S3_BUCKET,
        Key: fileName,
    });

    const url = await getSignedUrl(client, command, { expiresIn: 3600 * 24 }); // URL válida por 1 hora
    return url;
}