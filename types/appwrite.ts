import type { Models } from "node-appwrite";

export type FileType = "document" | "image" | "video" | "audio" | "other";

export interface UserDocument extends Models.Document {
    fullName: string;
    email: string;
    avatar?: string | null;
    accountId: string;

    files?: FileDocument[] | string[] | null;
}
export interface FileDocument extends Models.Document {
    name: string;
    url: string;
    type: FileType;
    bucketFileId: string;
    accountId: string;

    extension?: string | null;
    size?: number | null;
    users?: string[] | null;

    owner?: UserDocument;
}
