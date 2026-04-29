import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FileDocument, UserDocument } from "@/types/appwrite";

const ImageThumbnail = ({ file }: { file: FileDocument }) => (
    <div className="mb-1! flex items-center gap-3 rounded-[20px] border border-light-200/40 bg-light-400/30 p-4">
        <Thumbnail type={file.type} extension={file.extension!} url={file.url} />
        <div className="flex flex-col">
            <p className="text-[14px] leading-5 font-semibold line-clamp-1">{file.name}</p>
            <FormattedDateTime date={file.$createdAt} className="caption text-light-200" />
        </div>
    </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex">
        <p className="text-[14px] leading-5 font-normal w-[30%] text-light-100 text-left">{label}</p>
        <p className="text-[14px] leading-5 flex-1 text-left">{value}</p>
    </div>
);

export const FileDetails = ({ file }: { file: FileDocument }) => {
    return (
        <>
            <ImageThumbnail file={file} />
            <div className="space-y-4 px-2 pt-2">
                <DetailRow label="Format:" value={file.extension!} />
                <DetailRow label="Size:" value={convertFileSize(file.size!)} />
                <DetailRow label="Owner:" value={file.owner?.fullName || "Unknown"} />
                <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
            </div>
        </>
    );
};

interface Props {
    file: FileDocument;
    onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
    onRemove: (email: string) => void;
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
    console.log("This is the file info", file)
    return (
        <>
            <ImageThumbnail file={file} />

            <div className="mt-2! space-y-2">
                <p className="text-[14px] leading-5 font-semibold pl-1 text-light-100">
                    Share file with other users
                </p>
                <Input
                    type="email"
                    placeholder="Enter email address"
                    onChange={(e) => onInputChange(e.target.value.trim().split(","))}
                    className="body-2 shad-no-focus h-13 w-full rounded-full border border-light-200/50 px-6 shadow-drop-1 focus-visible:ring-1 focus-visible:ring-[#FA7275]"
                />
                <div className="pt-4">
                    <div className="flex justify-between">
                        <p className="text-[14px] leading-5 font-semibold text-light-100">Shared with</p>
                        <p className="text-[14px] leading-5 font-semibold text-light-200">
                            {file?.users?.length} users
                        </p>
                    </div>

                    <ul className="pt-2">
                        {file?.users?.map((user: UserDocument) => (
                            <li
                                key={user.email}
                                className="flex items-center justify-between gap-2"
                            >
                                <p className="text-[14px] leading-5 font-semibold">{user.email}</p>
                                    <Button
                                        onClick={() => onRemove(user.email)}
                                        className="rounded-full bg-transparent text-light-100 shadow-none transition-all hover:bg-light-400/50"
                                    >
                                    <Image
                                        src="/assets/icons/remove.svg"
                                        alt="Remove"
                                        width={24}
                                        height={24}
                                        className="aspect-square rounded-full"
                                    />
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
