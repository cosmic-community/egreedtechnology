// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Certification type
export interface Certification extends CosmicObject {
  type: 'certified-devops-professional' | 'certified-full-stack-web-developer' | 'certified-mobile-app-developer' | 'certified-embedded-systems-iot-specialist';
  metadata: {
    certificate_name?: string;
    description?: string;
    course?: Course;
    level?: CertificationLevel;
    credential_prefix?: string;
    validity_period?: number;
    skills?: string[];
    badge?: {
      url: string;
      imgix_url: string;
    };
    requirements?: string;
    recognition?: string;
  };
}

// Course type
export interface Course extends CosmicObject {
  type: 'courses';
  metadata: {
    description?: string;
    duration?: number;
    level?: string;
    prerequisites?: string[];
    learning_outcomes?: string[];
    thumbnail?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Blog Post type
export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    excerpt?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    tags?: string[];
    published_date?: string;
    reading_time?: number;
  };
}

// Author type
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    role?: string;
    social_links?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    description?: string;
    color?: string;
  };
}

// User type
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    name?: string;
    email?: string;
    password_hash?: string;
    enrolled_courses?: string[];
    certifications_earned?: string[];
  };
}

// Contact Submission type
export interface ContactSubmission extends CosmicObject {
  type: 'contact-submissions';
  metadata: {
    name?: string;
    email?: string;
    message?: string;
    submitted_at?: string;
    status?: 'new' | 'read' | 'responded';
  };
}

// Type literals for select-dropdown values
export type CertificationLevel = 'Foundation' | 'Associate' | 'Professional' | 'Expert';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Search result type
export interface SearchResult {
  id: string;
  type: 'certification' | 'course' | 'blog-post';
  title: string;
  slug: string;
  excerpt?: string;
  thumbnail?: string;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

// Contact form type
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}