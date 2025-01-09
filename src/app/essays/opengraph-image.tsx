import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Essays by John Jeong'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  const interSemiBold = fetch(
    new URL('../fonts/Inter-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())
 
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: 'white',
        }}
      >
        <div
          style={{
            fontSize: 32,
            marginBottom: 24,
            color: '#666',
          }}
        >
          Collection
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#111',
          }}
        >
          Essays
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            fontSize: 32,
            color: '#111',
          }}
        >
          John Jeong
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  )
}
