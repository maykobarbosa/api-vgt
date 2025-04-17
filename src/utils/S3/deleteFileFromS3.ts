import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Função para deletar arquivo no S3
export async function deleteFileFromS3(fileName: string) {
    const s3 = new S3Client({
        region: process.env.AMAZON_S3_REGION,
        credentials: {
            accessKeyId: process.env.AMAZON_S3_KEY!,
            secretAccessKey: process.env.AMAZON_S3_SECRET!,
        },
    });

    try {
        const deleteParams = {
            Bucket: process.env.AMAZON_S3_BUCKET!,
            Key: fileName, // Nome do arquivo que deseja deletar
        };

        const command = new DeleteObjectCommand(deleteParams);
        await s3.send(command);
    } catch (error) {
        console.error("Erro ao deletar arquivo do S3:", error);
        throw error;
    }
}
