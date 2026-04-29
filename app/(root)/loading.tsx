import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:gap-10">
      <section>
        {/* Chart Skeleton */}
        <div className="flex h-72 w-full items-center justify-center rounded-[20px] bg-white shadow-sm">
           <Skeleton className="size-48 rounded-full" />
        </div>

        {/* Uploaded file type summaries skeletons */}
        <ul className="mt-6 grid grid-cols-1 gap-4 xl:mt-10 xl:grid-cols-2 xl:gap-9">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-[20px] bg-white p-5 shadow-sm h-40 flex flex-col gap-4">
               <div className="flex justify-between items-start">
                  <Skeleton className="size-20 rounded-lg" />
                  <Skeleton className="h-6 w-24" />
               </div>
               <Skeleton className="h-6 w-1/2 mx-auto" />
               <Skeleton className="h-4 w-1/3 mx-auto" />
            </div>
          ))}
        </ul>
      </section>

      {/* Recent Files Skeleton */}
      <section className="h-full rounded-[20px] bg-white p-5 xl:p-7 shadow-sm min-h-[400px]">
        <Skeleton className="h-10 w-64 mb-6" />
        <ul className="mt-5 flex flex-col gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-3 p-2">
              <div className="flex items-center gap-3 flex-1">
                <Skeleton className="size-10 rounded-lg shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
              <Skeleton className="size-8 rounded-full" />
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Loading;
