import clsx from "clsx";
import Image from "next/image";
import type { SVGProps } from "react";

import logoEducaia from "@/images/logos/aia.svg";
import logoBMind from "@/images/logos/bmind.webp";
import logoContentful from "@/images/logos/contentful.png";
import logoElixir from "@/images/logos/elixir.webp";
import logoFirstblood from "@/images/logos/firstblood.ico";
import logoSupersolid from "@/images/logos/supersolid.png";

function BriefcaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

export default function Resume() {
  let resume = [
    {
      company: "Educaia",
      title: "Co-founder & CTO",
      logo: logoEducaia,
      start: "2023",
      end: "Present",
    },
    {
      company: "Contenful",
      title: "Senior Software Engineer",
      logo: logoContentful,
      start: "Sept 2022",
      end: "June 2023",
    },
    {
      company: "Elixir Games",
      title: "Senior Developer",
      logo: logoElixir,
      start: "2022",
      end: "2022",
    },
    {
      company: "Firstblood",
      title: "Backend Engineer",
      logo: logoFirstblood,
      year: "2021",
    },
    {
      company: "Supersolid",
      title: "Server Developer",
      logo: logoSupersolid,
      year: "2020",
    },
    {
      company: "BMind",
      title: "FullStack Developer",
      logo: logoBMind,
      start: "2017",
      end: "2020",
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={role.logo}
                alt=""
                className={clsx("h-8 w-8", {
                  "rounded-full bg-white": role.logo === logoBMind,
                })}
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              {role.year ? (
                <dd
                  className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                  aria-label={role.year}
                >
                  <time dateTime={role.year}>{role.year}</time>
                </dd>
              ) : (
                <dd
                  className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                  aria-label={`${role.start} until ${
                    typeof role.end != "string" ? role.end.label : role.end
                  }`}
                >
                  <time dateTime={role.start}>{role.start}</time>{" "}
                  <span aria-hidden="true">—</span>{" "}
                  <time
                    dateTime={
                      typeof role.end != "string"
                        ? role.end.dateTime.toString()
                        : role.end
                    }
                  >
                    {typeof role.end != "string" ? role.end.label : role.end}
                  </time>
                </dd>
              )}
            </dl>
          </li>
        ))}
      </ol>
      {/* <Button href="#" variant="secondary" className="group mt-6 w-full">
          Download CV
          <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
        </Button> */}
    </div>
  );
}
