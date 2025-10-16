import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const footerLinks = [
    {
      title: "Mahsulot",
      links: [
        { label: "Xususiyatlar", href: "#" },
        { label: "Narxlar", href: "#" },
        { label: "Haqida", href: "#" },
      ],
    },
    {
      title: "Kompaniya",
      links: [
        { label: "Biz haqimizda", href: "#" },
        { label: "Aloqa", href: "#" },
      ],
    },
    {
      title: "Xususiy",
      links: [
        { label: "Maxfiylik", href: "#" },
        { label: "Shartlar", href: "#" },
        { label: "Cookie", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "Github" },
  ];

  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-900 flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="text-xl font-bold">Konn.uz</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">Barcha havolalaringizni bir joyda</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-secondary border border-border hover:border-green-500/50 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>© 2025 Konn.uz. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}
