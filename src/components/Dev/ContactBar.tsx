import { IconType } from "react-icons";
import { FiMail, FiDownload } from "react-icons/fi";
import { SiGithub, SiLinkedin } from "react-icons/si";

interface ContactBarProps {
  links: {
    github: string;
    linkedin: string;
    instagram: {
        url: string;
        handle: string;
    };
    email: {
        address: string;
        display: string;
    };
  }
}

export default function ContactBar(props: ContactBarProps) {
  const { links } = props;
  
  const contactLinks: {
    icon: IconType;
    label: string;
    href: string;
    external?: boolean;
    download?: boolean;
  }[] = [
    { icon: SiGithub, label: 'github', href: links.github, external: true },
    { icon: SiLinkedin, label: 'linkedin', href: links.linkedin, external: true },
    { icon: FiMail, label: 'email', href: `mailto:${links.email.address}` },
    { icon: FiDownload, label: 'download cv', href: '/AndresOssa-CV-2025.pdf', download: true },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 !mt-[10px] pt-[10px]">
      {contactLinks.map(({ icon: Icon, label, href, external, download }) => (
        <a
          key={label}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          download={download ? '' : undefined}
          className="font-mono text-xs sm:text-sm px-3 py-1.5 rounded-md glass glass-border-cyan neo-link inline-flex items-center gap-2"
        >
          <Icon size={18} className="shrink-0" aria-hidden="true" />
          <span className="leading-none">{label}</span>
        </a>
      ))}
    </div>
  );
}
