import { useTranslation } from "@/hooks/use-translation";

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = [
    {
      title: t("footer.product"),
      links: [
        { label: t("footer.product1"), href: "#analitika" },
        { label: t("footer.product3"), href: "#loyiha" },
      ],
    },
    {
      title: t("footer.privacy"),
      links: [
        { label: t("footer.privacy1"), href: "/privacy" },
        { label: t("footer.privacy2"), href: "/terms" },
      ],
    }
  ];

  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center">
                <img src="/icons/logo.png" alt="Logo" className="rounded-md" />
              </div>
              <span className="text-xl font-bold">Konn</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">{t("footer.title")}</p>
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
          <p>{t("footer.reserved")}</p>
        </div>
      </div>
    </footer>
  );
}
