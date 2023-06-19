const Spotify = () => {
  return (
    <section id="spotify" className="mb-4">
      <iframe
        className="rounded-xl"
        src="https://open.spotify.com/embed/playlist/37i9dQZF1Epzmr4jjbZGin"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </section>
  );
};

export default Spotify;
