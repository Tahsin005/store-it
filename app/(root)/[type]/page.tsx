const Page = async ({ searchParams, params }: SearchParamProps) => {
    const type = ((await params)?.type as string) || "";

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
            <section className="w-full">
                <h1 className="capitalize text-[34px] leading-[42px] font-bold">{type}</h1>
            </section>
        </div>
    )
};

export default Page;