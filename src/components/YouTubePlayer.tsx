interface YouTubePlayerProps {
  id: string
}

export default function YouTubePlayer({ id }: YouTubePlayerProps) {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}
