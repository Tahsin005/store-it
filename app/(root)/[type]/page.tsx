import Card from "@/components/Card";
import { getFiles } from "@/lib/actions/file.actions";
import { getFileTypesParams } from "@/lib/utils";
import { FileDocument } from "@/types/appwrite";
import { Models } from "node-appwrite";

const Page = async ({ searchParams, params }: SearchParamProps) => {
    const type = ((await params)?.type as string) || "";

    const searchText = ((await searchParams)?.query as string) || "";
    const sort = ((await searchParams)?.sort as string) || "";

    const types = getFileTypesParams(type) as FileType[];

    const files = await getFiles({ types, searchText, sort });
    console.log("-----------------------------------------", files)

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
            <section className="w-full">
                <h1 className="capitalize text-[34px] leading-10.5 font-bold">{type}</h1>
                <div className="flex mt-2 flex-col justify-between sm:flex-row sm:items-center">
                    <p className="text-[16px] leading-6 font-normal">
                        Total: <span className="h5">0 MB</span>
                    </p>

                    <div className="mt-5 flex items-center sm:mt-0 sm:gap-3">
                        <p className="text-[16px] leading-6 font-normal hidden text-light-200 sm:block">Sort by:</p>

                        {/* <Sort /> */}
                    </div>
                </div>
            </section>

            {files.total > 0 ? (
                <section className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {files.documents.map((file: FileDocument) => (
                    <Card key={file.$id} file={file} />
                ))}
                </section>
            ) : (
                <p className="text-[16px] leading-6 font-normal mt-10 text-center text-light-200">No files uploaded</p>
            )}
        </div>
    )
};

export default Page;