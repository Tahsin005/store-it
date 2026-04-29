import Image from "next/image";
import Link from "next/link";
import { FileDocument } from "@/types/appwrite";

import ActionDropdown from "@/components/ActionDropdown";
import { Chart } from "@/components/Chart";
import { FormattedDateTime } from "@/components/FormattedDateTime";
import { Thumbnail } from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  // Get usage summary
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:gap-10">
      <section>
        <Chart used={totalSpace.used} />

        {/* Uploaded file type summaries */}
        <ul className="mt-6 grid grid-cols-1 gap-4 xl:mt-10 xl:grid-cols-2 xl:gap-9">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="relative mt-6 rounded-[20px] bg-white p-5 transition-all hover:scale-105"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    width={100}
                    height={100}
                    alt="uploaded image"
                    className="absolute -left-3 -top-6.25 z-10 w-47.5 object-contain"
                  />
                  <h4 className="text-[18px] leading-5 font-medium relative z-20 w-full text-right">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>

                <h5 className="text-[16px] leading-6 font-semibold relative z-20 text-center">{summary.title}</h5>
                <Separator className="bg-light-400" />
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>

      <section className="h-full rounded-[20px] xl:h-163.5 custom-scrollbar overflow-auto bg-white p-5 xl:p-7 shadow-sm">
        <h2 className="h2 text-light-100">Recent files uploaded</h2>
        {files.documents.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-3">
            {files.documents.map((file: FileDocument) => (
              <li
                key={file.$id}
                className="flex items-center justify-between gap-3 rounded-[12px] p-2 transition-colors hover:bg-light-400/30"
              >
                <Link
                  href={file.url}
                  target="_blank"
                  className="flex flex-1 items-center gap-3 overflow-hidden"
                >
                  <Thumbnail
                    type={file.type}
                    extension={file.extension ?? ""}
                    url={file.url}
                    className="size-10 shrink-0"
                    imageClassName="!size-6"
                  />

                  <div className="flex flex-col gap-1 overflow-hidden">
                    <p className="text-[14px] leading-5 font-semibold text-light-100 truncate">
                      {file.name}
                    </p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="caption text-light-200"
                    />
                  </div>
                </Link>

                <div className="shrink-0">
                  <ActionDropdown file={file} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[16px] leading-6 font-normal mt-10 text-center text-light-200">
            No files uploaded
          </p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
