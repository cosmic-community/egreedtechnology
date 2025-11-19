import { compare, hash } from 'bcryptjs'
import { cosmic, hasStatus } from './cosmic'
import type { User, LoginCredentials, SignupData } from '@/types'

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword)
}

export async function createUser(data: SignupData): Promise<User> {
  const { name, email, password } = data
  
  // Check if user already exists
  try {
    const response = await cosmic.objects
      .find({
        type: 'users',
        'metadata.email': email
      })
      .props(['id', 'title'])
    
    if (response.objects && response.objects.length > 0) {
      throw new Error('User already exists')
    }
  } catch (error) {
    if (!hasStatus(error) || error.status !== 404) {
      throw error
    }
    // 404 is expected - user doesn't exist, continue with creation
  }
  
  const passwordHash = await hashPassword(password)
  
  const response = await cosmic.objects.insertOne({
    type: 'users',
    title: email,
    slug: email.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    metadata: {
      name,
      email,
      password_hash: passwordHash,
      enrolled_courses: [],
      certifications_earned: []
    }
  })
  
  return response.object as User
}

export async function authenticateUser(credentials: LoginCredentials): Promise<User | null> {
  const { email, password } = credentials
  
  try {
    const response = await cosmic.objects
      .find({
        type: 'users',
        'metadata.email': email
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    if (!response.objects || response.objects.length === 0) {
      return null
    }
    
    const user = response.objects[0] as User
    
    if (!user.metadata?.password_hash) {
      return null
    }
    
    const isValid = await verifyPassword(password, user.metadata.password_hash)
    
    if (!isValid) {
      return null
    }
    
    return user
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'users',
        'metadata.email': email
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    if (!response.objects || response.objects.length === 0) {
      return null
    }
    
    return response.objects[0] as User
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}