import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiThreadsFill,
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
          src="/john.jpeg"
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
            href="https://cal.com/john.jeong/30min"
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

          <Link
            href="https://www.threads.net/@jonnyjohnj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <RiThreadsFill size={24} />
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Experience</h2>

        <ExperienceItem
          role="CEO"
          company="Fastrepl"
          period="Aug 2024 - Present"
          location="San Francisco Bay Area"
        />

        <ExperienceItem
          role="CEO, Co-founder"
          company="Pado Labs"
          period="Apr 2023 - Aug 2024"
          location="San Francisco Bay Area"
        >
          <p className="mt-2 text-gray-800">
            Led AI-driven product development for Philo, an agentic search
            engine for stock investors.
          </p>
        </ExperienceItem>

        <ExperienceItem
          role="Business Development Manager"
          company="Deer Corporation"
          period="Dec 2022 - Mar 2023"
          location="Seoul"
        >
          <p className="mt-2 text-gray-800">
            Worked on onboarding new customers, conducted door-to-door sales,
            and built an analytics dashboard for trucking industry products.
          </p>
        </ExperienceItem>

        <ExperienceItem
          role="Software Engineer, Co-founder"
          company="NextSingular"
          period="Aug 2021 - Jul 2022"
          location="Seoul"
        >
          <p className="mt-2 text-gray-800">
            Experimented various consumer mobile apps.
          </p>
        </ExperienceItem>

        <ExperienceItem
          role="Software Engineer, Co-founder"
          company="SingularLab Corp."
          period="Nov 2020 - Jun 2021"
          location="Seoul"
        >
          <p className="mt-2 text-gray-800">Worked on ed-tech mobile apps.</p>
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
