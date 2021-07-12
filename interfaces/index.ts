export interface UnsplashUrl {
  thumb: string;
  full: string;
  regular: string;
  small: string
}

export interface UnsplashImage {
  urls: UnsplashUrl
  width: number
  id: string;
  alt_description: string
  height: number
  exif: Exif
  created_at: string
  description: string;
  likes: string;
  views: string;
  downloads: string
  user: User
  error: number
}

export interface Exif {
  model: string
  aperture: string
  exposure_time: string
  focal_length: number
  iso: string
}

export interface User {
  name: string
}