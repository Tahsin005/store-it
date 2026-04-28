import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <section className="hidden w-1/2 items-center justify-center bg-[#FA7275] p-10 lg:flex xl:w-2/5">
                <div className="flex max-h-200 max-w-107.5 flex-col justify-center space-y-12">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        alt="logo"
                        width={224}
                        height={82}
                        className="h-auto brightness-0 invert"
                    />

                    <div className="space-y-5 text-white">
                        <h1 className="text-4xl font-bold leading-tight">
                            Manage your files the best way
                        </h1>
                        <p className="text-lg text-white opacity-90">
                            A secure and efficient place to store, manage, and share all your documents.
                        </p>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute -inset-4 bg-[#FA7275]/20 blur-2xl rounded-full" />
                        <Image
                            src="/assets/images/files.png"
                            alt="Files"
                            width={342}
                            height={342}
                            className="relative transition-all duration-500 hover:rotate-2 hover:scale-105"
                        />
                    </div>
                </div>
            </section>

            <section className="flex flex-1 flex-col items-center bg-white p-6 py-12 shadow-2xl lg:justify-center lg:p-10 lg:shadow-none">
                <div className="mb-16 lg:hidden">
                    <Image
                        src="/assets/icons/logo-full-brand.svg"
                        alt="logo"
                        width={224}
                        height={82}
                        className="h-auto w-50"
                    />
                </div>

                <div className="w-full max-w-120">
                    {children}
                </div>
            </section>
        </div>
    );
};

export default Layout;
