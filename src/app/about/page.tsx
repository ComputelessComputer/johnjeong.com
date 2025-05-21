import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiTwitterXFill,
} from "@remixicon/react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | John Jeong",
  description: "About John Jeong - Experience and Education",
};

const ExperienceItem = ({
  role,
  company,
  period,
  location,
  children,
}: {
  role: string;
  company: string;
  period: string;
  location: string;
  children?: React.ReactNode;
}) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold">{role}</h3>
    <p className="text-lg font-semibold text-gray-700">{company}</p>
    <p className="text-sm text-gray-600">
      {period} · {location}
    </p>
    {children}
  </div>
);

const EducationItem = ({
  school,
  degree,
  period,
}: {
  school: string;
  degree: string;
  period: string;
}) => (
  <div className="mb-6">
    <h3 className="text-xl font-bold">{school}</h3>
    <p className="text-lg text-gray-700">{degree}</p>
    <p className="text-sm text-gray-600">{period}</p>
  </div>
);

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 sr-only">About</h1>

      <div className="relative size-32 mb-8">
        <Image
          src="/john.png"
          alt="John Jeong"
          fill
          className="rounded-full object-cover"
        />
      </div>

      <section className="mb-12 prose prose-gray">
        <p className="text-lg text-gray-800">
          I love simple, intuitive designs and enjoy listening to music. Feel
          free to contact me via{" "}
          <Link
            href="mailto:jeeheontransformers@gmail.com"
            className="text-blue-600 hover:text-blue-800"
          >
            email
          </Link>{" "}
          or just{" "}
          <Link
            href="/cal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            arrange a meeting
          </Link>
          .
        </p>

        <div className="flex space-x-4 mt-4">
          <Link
            href="https://github.com/ComputelessComputer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <RiGithubFill size={24} />
          </Link>

          <Link
            href="https://linkedin.com/in/johntopia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <RiLinkedinBoxFill size={24} />
          </Link>

          <Link
            href="https://x.com/Computeless"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <RiTwitterXFill size={24} />
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Experience</h2>

        <ExperienceItem
          role="Co-Founder"
          company="Hyprnote - AI Notepad for Meetings"
          period="Aug 2024 - Present · 10 mos"
          location="San Francisco Bay Area"
        >
          <p className="mt-2 text-gray-800">
            Privacy-first AI note-taker - take control over your conversational data.
          </p>
        </ExperienceItem>

        <ExperienceItem
          role="Co-founder & CEO"
          company="Pado Labs"
          period="Apr 2023 - Aug 2024 · 1 yr 5 mos"
          location="San Francisco Bay Area"
        >
          <p className="mt-2 text-gray-800">
            Ultimately failed. However, loved the journey of building.
          </p>
          <p className="mt-2 text-gray-800">
            AI Research Analyst agents for investors<br />
            - Eli: An AI Meeting Copilot that give real-time suggestions (e.g., background info, technical info, acronym/jargon explanations, potential follow-up questions)<br />
            - Philo: A search engine for stock investors - think DeepResearch but for stocks / markets<br />
            - among other tools: RAG for EDGAR, multi-agent orchestration, research ops, etc.
          </p>
        </ExperienceItem>

        <ExperienceItem
          role="Product & GTM"
          company="Various Startups"
          period="2021 - 2023 · 2 yrs"
          location=""
        >
          <p className="mt-2 text-gray-800">
            Product & GTM teams including:
          </p>
          <p className="mt-2 text-gray-800">
            🚚 Middle-mile logistics (Series B)<br />
            - GTM to onboard trucking brokers on to the logistics platform<br />
            - built internal pipeline analytics tools & revamped onboarding UX
          </p>
          <p className="mt-2 text-gray-800">
            👾 Creator economy (Series A)<br />
            - launched a squarespace-like website builder for creators to monetize<br />
            - led early-product strategy including discovery and MVP development
          </p>
        </ExperienceItem>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Education</h2>

        <EducationItem
          school="Seoul National University"
          degree="BS, Nuclear Engineering"
          period="Mar 2015 - Aug 2022"
        />

        <EducationItem
          school="Sejong Science High School"
          degree="High School Diploma"
          period="Mar 2013 - Feb 2015"
        />
      </section>
    </div>
  );
}
