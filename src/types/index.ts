export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Path to image or icon name
  link: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  image: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}
