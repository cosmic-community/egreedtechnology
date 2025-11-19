export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  
  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`
  
  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}