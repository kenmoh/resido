import React from 'react'
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;
}>) {
    return (

        <main className={'mx-4'}>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <SidebarTrigger className="-ml-1"/>
                    {/*<header*/}
                    {/*    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">*/}
                    {/*    <div className="flex items-center px-4 justify-between w-full">*/}
                    {/*        <SidebarTrigger className="-ml-1"/>*/}

                    {/*        <div className='flex gap-2.5 items-center'>*/}
                    {/*            <User className='text-gray-400' size={25}/>*/}
                    {/*            <span className='text-gray-500'>Kenneth</span>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</header>*/}
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </main>

    );
}
