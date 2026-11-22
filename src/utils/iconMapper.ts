import {
  Flower2,
  BookOpen,
  FileText,
  CodeXml,
  Mail,
  House as Home,
  User,
  Briefcase,
  GraduationCap,
  Star,
  Heart,
  Lightbulb,
  Rocket,
  Folder,
  Terminal,
  Link,
  MessageCircleCode,
  Phone,
  MessageSquare,
  Send,
  Pickaxe,
  Hammer,
  Wrench,
  FolderCode,
  Award,
  Globe,
  Bot,
  ShieldCheck,
  Workflow,
  Cloud,
  AppWindow,
} from "@lucide/astro";

// Social media icon components
import GitHub from "../components/icons/GitHub.astro";
import LinkedIn from "../components/icons/LinkedIn.astro";
import Twitter from "../components/icons/Twitter.astro";
import Bluesky from "../components/icons/Bluesky.astro";
import Instagram from "../components/icons/Instagram.astro";
import YouTube from "../components/icons/YouTube.astro";

export type IconName =
  | "Flower2"
  | "BookOpen"
  | "FileText"
  | "CodeXml"
  | "Mail"
  | "Home"
  | "User"
  | "Briefcase"
  | "GraduationCap"
  | "Star"
  | "Heart"
  | "Lightbulb"
  | "Rocket"
  | "Folder"
  | "Terminal"
  | "Link"
  | "MessageCircleCode"
  | "Phone"
  | "MessageSquare"
  | "Send"
  | "Pickaxe"
  | "Hammer"
  | "Wrench"
  | "FolderCode"
  | "Award"
  | "Globe"
  | "Bot"
  | "ShieldCheck"
  | "Workflow"
  | "Cloud"
  | "AppWindow"
  | "GitHub"
  | "LinkedIn"
  | "Twitter"
  | "Bluesky"
  | "Instagram"
  | "YouTube"
  | "Email"
  | "Sponsor";

export const iconMap: Record<IconName, any> = {
  Flower2,
  BookOpen,
  FileText,
  CodeXml,
  Mail,
  Home,
  User,
  Briefcase,
  GraduationCap,
  Star,
  Heart,
  Lightbulb,
  Rocket,
  Folder,
  Terminal,
  Link,
  MessageCircleCode,
  Phone,
  MessageSquare,
  Send,
  Pickaxe,
  Hammer,
  Wrench,
  FolderCode,
  Award,
  Globe,
  Bot,
  ShieldCheck,
  Workflow,
  Cloud,
  AppWindow,
  GitHub,
  LinkedIn,
  Twitter,
  Bluesky,
  Instagram,
  YouTube,
  Email: Mail,
  Sponsor: Heart,
};

export function getIcon(iconName: IconName) {
  return iconMap[iconName];
}
