import Link from "next/link";
import CalDotCom from "./CalDotCom";

const Bio = () => {
  return (
    <section id="bio" className="mb-4 text-sm max-w-sm">
      <p className="mb-2">
        Welcome to Johntopia, a digital home of John Jeong. I am currently
        co-founder and CEO of{" "}
        <span>
          <Link
            href="https://fastrepl.com"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            Fastrepl
          </Link>
        </span>
        . Prior to this, I co-founded Pado Labs, where I explored how AI agents
        could enhance productivity for various professionals. My prior
        experiences include Business Development & Sales Manager @{" "}
        <span>
          <Link
            href="https://deering.co"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            Deer
          </Link>
        </span>
        , an e-cooter startup based in Seoul, and Product Owner @{" "}
        <span>
          <Link
            href="https://youha.info"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            YOUHA
          </Link>
        </span>
        , an influencer discovery platform.
      </p>
      <p className="mb-2">
        I received my B.S. in Nuclear Engineering @ Seoul National University.
        Before that, I graduated early from Sejong Science High School (wanted
        to become a theoretical physicist).
      </p>
      <p>
        I love simple, intuitive designs and enjoy listening to music; below are
        the songs that I listen on repeat. Feel free to contact me via{" "}
        <span>
          <Link
            href="mailto:jeeheontransformers@gmail.com"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            email
          </Link>
        </span>{" "}
        or just arrange a{" "}
        <span className="hover:text-blue-400 text-blue-600 underline cursor-pointer">
          <CalDotCom>meeting</CalDotCom>
        </span>
        .
      </p>
    </section>
  );
};

export default Bio;
