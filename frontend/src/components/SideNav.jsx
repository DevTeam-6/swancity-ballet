"use client";

import React, { useState } from "react";
import { Sidebar, useSidebar, Overlay } from "@rewind-ui/core";
import Image from "next/image";
import { Rocket, Briefcase, Users, Shield, Key, Sliders, LucideVolleyball, PanelTopOpen, Book, User } from "lucide-react";

export default function SidebarNav() {
    const [expanded, setExpanded] = useState(true);
    const [mobile, setMobile] = useState(false);
    const sidebar = useSidebar();

    return (
        <div className="relative flex flex-row w-full h-auto">
            <Sidebar
                onToggle={(state) => {
                    setExpanded(state.expanded);
                    setMobile(state.mobile);
                }}
                className="absolute"
            >
                <Sidebar.Head>
                    <Sidebar.Head.Logo>
                        <Image src="/images/rewind.svg" width={48} height={48} alt="Company Name" />
                    </Sidebar.Head.Logo>
                    <Sidebar.Head.Title>Company Name</Sidebar.Head.Title>
                    <Sidebar.Head.Toggle />
                </Sidebar.Head>

                <Sidebar.Nav>
                    <Sidebar.Nav.Section>
                        <Sidebar.Nav.Section.Item icon={<Rocket />} label="Dashboard" href="/" active />
                    </Sidebar.Nav.Section>

                    <Sidebar.Nav.Section>
                        <Sidebar.Nav.Section.Item icon={<User />} label="Students" href="/students" />
                        <Sidebar.Nav.Section.Item icon={<Users />} label="Families" as="button">
                            <Sidebar.Nav.Section isChild>
                                <Sidebar.Nav.Section.Item label="List all" href="#" />
                                <Sidebar.Nav.Section.Item label="Add new" href="#" />
                                <Sidebar.Nav.Section.Item label="Archived" href="#" />
                            </Sidebar.Nav.Section>
                        </Sidebar.Nav.Section.Item>
                        <Sidebar.Nav.Section.Item icon={<Briefcase />} label="Classes" href="#" />
                        <Sidebar.Nav.Section.Item icon={<Key />} label="Users" href="#" />
                        <Sidebar.Nav.Section.Item icon={<Sliders />} label="Settings" href="#" />
                    </Sidebar.Nav.Section>


                </Sidebar.Nav>

                <Sidebar.Footer>
                    <div className="flex flex-col justify-center items-center text-sm">
                        <span className="font-semibold">Company Name</span>
                        <span>version x.y.z</span>
                    </div>
                </Sidebar.Footer>
            </Sidebar>

            <main
                className={`transition-all transform duration-100 text-slate-700 flex w-full flex-col items-center ${expanded ? "md:ml-64" : "md:ml-20"
                    }`}
            >
                {mobile && (
                    <Overlay
                        blur="none"
                        onClick={() => sidebar.toggleMobile()}
                        className="md:hidden z-40"
                    />
                )}
            </main>
        </div>
    );
};
