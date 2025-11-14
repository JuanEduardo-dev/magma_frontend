export interface ConfigurationOption {
  id: string;
  title: string;
  description: string;
  icon: string | { src: string; height: number; width: number };
  href: string;
}
