"use client";
import { Users, BookOpen, ClipboardList } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Link from "next/link";

const Page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <h2 className="text-2xl font-semibold text-darkBlue-900 mb-4 text-primary-admin">Admin Dashboard</h2>
      <ul className="grid grid-cols-12 gap-4 w-full mt-6">
        <GridItem
          area="col-span-6"
          icon={<Users className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="All Users"
          description="Manage and view all registered users."
          link="/admin/users"
        />

        <GridItem
          area="col-span-6"
          icon={<BookOpen className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="All Books"
          description="Browse and manage the book inventory."
          link="/admin/books"
        />

        <GridItem
          area="col-span-12"
          icon={<ClipboardList className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Borrow Requests"
          description="Track and approve book borrow requests."
          link="/admin/book-requests"
        />
      </ul>
    </section>
  );
};

export default Page;

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  link: string;
}

const GridItem = ({ area, icon, title, description, link }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <Link href={link} className="block h-full">
        <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
          <GlowingEffect
            blur={0}
            borderWidth={3}
            spread={80}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
            <div className="relative flex flex-1 flex-col justify-between gap-3">
              <div className="w-fit rounded-lg border border-gray-600 p-2">{icon}</div>
              <div className="space-y-3">
                <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                  {title}
                </h3>
                <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-black dark:text-neutral-400">
                  {description}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
