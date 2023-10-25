import Link from "next/link";

const Bio = () => {
  return (
    <section id="bio" className="mb-4 text-sm max-w-sm">
      <p>
        I am John Jeong, co-founder and Business Owner of{" "}
        <span>
          <Link
            href="https://padocorp.com"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            Pado
          </Link>
        </span>
        . Prior experiences include Sales & Business Development Manager @{" "}
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
        , an influencer discovery platform for marketers. I love simple,
        intuitive designs and enjoy listening to music; below are the songs that
        I listen on repeat. Also, Feel free to contact me via{" "}
        <span>
          <Link
            href="mailto:john@padocorp.com"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            email
          </Link>
        </span>{" "}
        or just arrange a{" "}
        <span>
          <Link
            href="https://calendly.com/john-jeong/1hr"
            className="hover:text-blue-400 text-blue-600 underline"
          >
            meeting
          </Link>
        </span>
        .
      </p>
    </section>
  );
};

export default Bio;
