"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { useDebounce } from "use-debounce";
import { FileDocument } from "@/types/appwrite";
const Search = () => {
    const [query, setQuery] = useState("");
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("query") || "";
    const [results, setResults] = useState<FileDocument[]>([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const path = usePathname();
    const [debouncedQuery] = useDebounce(query, 300);

    useEffect(() => {
        const fetchFiles = async () => {
            if (debouncedQuery.length === 0) {
                setResults([]);
                setOpen(false);
                return router.push(path.replace(searchParams.toString(), ""));
            }

            setIsLoading(true);
            const files = await getFiles({ types: [], searchText: debouncedQuery });
            setResults(files.documents);
            setOpen(true);
            setIsLoading(false);
        };

        fetchFiles();
    }, [debouncedQuery]);

    useEffect(() => {
        if (!searchQuery) {
            setQuery("");
        }
    }, [searchQuery]);

    const handleClickItem = (file: FileDocument) => {
        setOpen(false);
        setResults([]);

        router.push(
            `/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`,
        );
    };

    return (
        <div className="relative w-full md:max-w-120">
            <div className="flex h-13 flex-1 items-center gap-3 rounded-full px-4 shadow-drop-3">
                <Image
                    src="/assets/icons/search.svg"
                    alt="Search"
                    width={24}
                    height={24}
                />
                <Input
                    value={query}
                    placeholder="Search..."
                    className="text-[14px] leading-5 font-normal outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-[16px] w-full border-none p-0 shadow-none placeholder:text-light-200"
                    onChange={(e) => setQuery(e.target.value)}
                />

                {open && (
                    <ul className="absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-[20px] bg-white p-4 border border-gray-400">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-10 gap-2">
                                <Image
                                    src="/assets/icons/loader.svg"
                                    alt="loader"
                                    width={40}
                                    height={40}
                                    className="animate-spin brightness-0"
                                />
                                <p className="text-[14px] leading-5 font-normal text-light-100">Searching...</p>
                            </div>
                        ) : results.length > 0 ? (
                            results.map((file) => (
                                <li
                                    className="flex items-center justify-between hover:bg-light-400/50 p-2 rounded-xl transition-all cursor-pointer"
                                    key={file.$id}
                                    onClick={() => handleClickItem(file)}
                                >
                                    <div className="flex items-center gap-4">
                                        <Thumbnail
                                            type={file.type}
                                            extension={file.extension!}
                                            url={file.url}
                                            className="size-9 min-w-9"
                                        />
                                        <p className="text-[14px] leading-5 font-semibold line-clamp-1 text-light-100">
                                            {file.name}
                                        </p>
                                    </div>

                                    <FormattedDateTime
                                        date={file.$createdAt}
                                        className="caption line-clamp-1 text-light-200"
                                    />
                                </li>
                            ))
                        ) : (
                            <p className="text-[14px] leading-5 font-normal text-center text-light-100">No files found</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Search;
