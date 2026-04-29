import React from "react";
import CardSkeleton from "@/components/CardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
      <section className="w-full">
        <Skeleton className="h-10 w-48 mb-4" />
        <div className="flex mt-2 flex-col justify-between sm:flex-row sm:items-center">
          <Skeleton className="h-6 w-32" />
          <div className="mt-5 flex items-center sm:mt-0 sm:gap-3">
            <Skeleton className="h-6 w-16 hidden sm:block" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
        </div>
      </section>

      <section className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </section>
    </div>
  );
};

export default Loading;
