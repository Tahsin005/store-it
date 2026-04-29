"use client";

import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/FormattedDateTime";
import ActionDropdown from "./ActionDropdown";
import { FileDocument } from "@/types/appwrite";
import { useState } from "react";
import Image from "next/image";

const Card = ({ file }: { file: FileDocument }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <div className="relative group">
            <Link href={file.url} target="_blank" className="flex cursor-pointer flex-col gap-6 rounded-[18px] bg-white p-5 shadow-sm transition-all hover:shadow-drop-3">
                <div className="flex justify-between">
                    <Thumbnail
                        type={file.type}
                        extension={file.extension!}
                        url={file.url}
                        className="size-20!"
                        imageClassName="!size-11"
                    />

                    <div className="flex flex-col items-end justify-between">
                        <ActionDropdown file={file} setIsDeleting={setIsDeleting} />
                        <p className="text-[16px] leading-6 font-normal">{convertFileSize(file.size!)}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 text-light-100">
                    <p className="text-[14px] leading-5 font-semibold line-clamp-1">{file.name}</p>
                    <FormattedDateTime
                        date={file.$createdAt}
                        className="text-[14px] leading-5 font-normal text-light-100"
                    />
                    <p className="text-[12px] leading-4 font-normal line-clamp-1 text-light-200">
                        By: {file.owner?.fullName || "Unknown"}
                    </p>
                </div>
            </Link>

            {isDeleting && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[18px] bg-white/60 backdrop-blur-[2px] transition-all">
                    <Image
                        src="/assets/icons/loader.svg"
                        alt="loader"
                        width={40}
                        height={40}
                        className="animate-spin brightness-0"
                    />
                </div>
            )}
        </div>
    );
};
export default Card;
