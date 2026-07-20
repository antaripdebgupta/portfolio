export type SocialIcon = "linkedin" | "medium" | "github" | "email";

export interface DockItem {
  title: string;
  icon: SocialIcon;
  href: string;
}

export const floatingDockItems: DockItem[] = [
  {
    title: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/antaripd/",
  },
  {
    title: "Medium",
    icon: "medium",
    href: "https://medium.com/@mail7antarip",
  },
  {
    title: "GitHub",
    icon: "github",
    href: "https://github.com/antaripdebgupta",
  },
  {
    title: "Email",
    icon: "email",
    href: "mailto:mail7antarip@gmail.com",
  },
];
