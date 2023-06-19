import Link from "next/link";

const Bio = () => {
  return (
    <section id="bio" className="mb-4 text-sm">
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
        .
      </p>
      <p>I love simple, intuitive designs.</p>
      <p>
        I enjoy listening to music; below are the songs that I listen on repeat.
      </p>
      <p>
        Feel free to contact me via{" "}
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
            href="https://www.sendtime.app/ko/reservation?i=I2heZH"
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
