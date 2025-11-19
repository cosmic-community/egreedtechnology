# Egreed Technology Learning Platform

![App Preview](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive e-learning and DevOps platform for Egreed Technology that combines educational content management, user authentication, blog functionality, and advanced search capabilities. This platform empowers students and professionals in Rwanda to access cutting-edge technology training.

## ✨ Features

- **E-Learning Platform**: Complete course catalog with certification programs
  - DevOps Professional Certification
  - Full-Stack Web Developer Certification
  - Mobile App Developer Certification
  - Embedded Systems & IoT Specialist Certification
- **User Authentication**: Secure login/signup system with protected routes
- **User Profiles**: Personal profile management with enrollment tracking
- **Dynamic Blog**: Articles with categories, tags, author profiles, and pagination
- **Advanced Search**: Real-time search across courses, certifications, and blog posts
- **Contact System**: Professional contact form with Resend email integration
- **SEO Optimized**: Dynamic meta tags, Open Graph, JSON-LD, sitemap, and robots.txt
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=691db5acb183692bb397b6be&clone_repository=691dbb4bb183692bb397b6f2)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build Dynamic web app with elearning platform and devops web app  
>
> overview of the Business and Its Purpose:
> Egreed Technology is a pioneering technology and innovation firm based in Rwanda, dedicated to transforming the digital landscape by seamlessly integrating information and communication technology (ICT) with cutting-edge physical automation and security solutions. Our mission is to empower individuals, businesses, and educational institutions by providing a comprehensive suite of innovative technological services that address the unique challenges of today's fast-paced digital environment. We believe that technology should not only be functional but also empower users to achieve their goals securely and efficiently.
>
> Main Products/Services Offered:
> Egreed Technology's diverse range of offerings includes:
>
> Web and Mobile App Development: Creating user-friendly, high-performance applications tailored to client needs.
>
> Full-Stack Development: Delivering end-to-end software solutions that cover both front-end and back-end development.
>
> Embedded Systems Automation: Implementing advanced security systems for homes, shops, industries, and personal safety, ensuring peace of mind through intelligent design.
>
> Social Media Management: Crafting and executing strategies to enhance online presence and engagement.
>
> IT & Development Courses: Offering specialized training in DevOps, web development, mobile app development, and more to nurture the next generation of tech talent in Rwanda.
>
> Target Market and Customer Benefits:
> Our services cater to a diverse clientele, including individual consumers seeking personal security solutions, large enterprises requiring complex systems for industrial automation, college students eager to enhance their tech skills, and tech enthusiasts looking for innovative solutions. By providing highly scalable and accessible solutions, Egreed Technology ensures that all our customers benefit from:
>
> Enhanced security through integrated digital and physical systems.
>            
> A robust online presence boosted by expert web and app development.
>
> Comprehensive educational opportunities that foster skill acquisition and innovation.
>
> What Makes Egreed Technology Unique:
> Egreed Technology stands out in the market through our holistic approach, which uniquely bridges the gap between the digital and physical worlds. Unlike other providers, we offer an unparalleled end-to-end security proposition, safeguarding both digital assets and physical properties with integrated solutions. Our commitment to sustainable innovation and talent nurturing sets us apart, as we actively contribute to building the local tech ecosystem while delivering high-caliber technological solutions. Our versatile scalability allows us to cater to a broad market, ensuring that personalized support is available for everyone, from individuals to large enterprises.
>
> Core Values and Mission:
> At Egreed Technology, we are guided by our core values of integrity, innovation, collaboration, and excellence. Our mission is to provide cutting-edge technological solutions that empower our clients while fostering a culture of learning and growth within the Rwandan tech community. We are dedicated to creating intelligent ecosystems where technology meets security and innovation, ultimately contributing to a sustainable and prosperous future for all.
>
> In summary, Egreed Technology offers a unique blend of services that not only addresses the immediate technological needs of our clients but also invests in the future of technology in Rwanda. Join us on this journey as we redefine the potential of technology in everyday life, ensuring safety, efficiency, and growth for individuals and organizations alike."

### Code Generation Prompt

> "Add comprehensive SEO features including dynamic meta tags, Open Graph tags, JSON-LD structured data, sitemap generation, and robots.txt.
>
> Create a user authentication system with login and signup using Cosmic to save the name, email, and password. Include protected routes and user profile management.
>
> Create a contact page with contact form that, when submitted, sends an email from my@email.com to my@email.com with basic user information: name, email, message. Send emails using Resend.
>
> Create a blog with article listing, individual article pages, categories, tags, and author profiles. Include pagination and related posts. Store content in Cosmic.
>
> Implement a search feature that allows users to search through [content type] with real-time results and filters."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic (Content Management)
- **Authentication**: Custom with Cosmic storage
- **Email**: Resend API
- **Package Manager**: Bun
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with bucket created
- Resend API key for email functionality

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd egreed-technology-platform
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
RESEND_API_KEY=your-resend-api-key
NEXTAUTH_SECRET=your-nextauth-secret-min-32-chars
NEXTAUTH_URL=http://localhost:3000
```

4. **Run the development server**
```bash
bun run dev
```

5. **Open your browser**

Navigate to `http://localhost:3000`

## 📚 Cosmic SDK Examples

### Fetching Certifications
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: certifications } = await cosmic.objects
  .find({ type: 'certified-devops-professional' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating a User
```typescript
await cosmic.objects.insertOne({
  type: 'users',
  title: email,
  metadata: {
    name: name,
    email: email,
    password_hash: hashedPassword
  }
})
```

### Fetching Blog Posts with Pagination
```typescript
const { objects: posts, total } = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
  .limit(9)
  .skip((page - 1) * 9)
```

## 🌐 Cosmic CMS Integration

This application uses Cosmic as the primary content management system for:

- **Certification Programs**: Store certification details, requirements, and skill coverage
- **Courses**: Manage course content and learning materials
- **Blog Posts**: Create and manage articles with categories and tags
- **Authors**: Store author profiles and information
- **Users**: Secure user authentication data storage
- **Contact Submissions**: Track contact form submissions

## 📦 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Import Project"
   - Select your repository

3. **Configure Environment Variables**
   - Add all environment variables from `.env.local`
   - Ensure `NEXTAUTH_URL` points to your production domain

4. **Deploy**
   - Vercel will automatically deploy your application

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
- `RESEND_API_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use strong, unique values for `NEXTAUTH_SECRET` (minimum 32 characters)
- Keep all API keys secure and rotate them periodically
- Review Cosmic bucket permissions regularly

## 📧 Email Configuration

This application uses Resend for email delivery. Contact form submissions will send emails from and to the configured email address. Make sure to:

1. Verify your domain in Resend dashboard
2. Use a verified sender email address
3. Monitor email delivery logs in Resend

## 🎓 Learning Platform Features

- **Course Catalog**: Browse available courses and certifications
- **Certification Details**: View requirements, skills covered, and validity periods
- **User Dashboard**: Track enrolled courses and earned certifications
- **Progress Tracking**: Monitor learning progress and completion status
- **Resource Library**: Access course materials and documentation

<!-- README_END -->