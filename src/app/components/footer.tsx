import Link from "next/link"
import { Github, Linkedin, Mail, Calendar } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:your.email@example.com",
    icon: Mail,
  },
  {
    name: "Calendar",
    href: "https://calendly.com/yourusername",
    icon: Calendar,
  },
]

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 로고 및 소개 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-lg">Portfolio</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              웹 개발자로서 사용자 경험을 중시하며
              <br />
              혁신적인 웹 솔루션을 만들어갑니다.
            </p>
          </div>

          {/* 퀵 링크 */}
          <div className="space-y-4">
            <h3 className="font-semibold">빠른 링크</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <a
                href="#home"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                홈
              </a>
              <a
                href="#projects"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                프로젝트
              </a>
              <a
                href="#skills"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                스킬
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                문의
              </a>
            </nav>
          </div>

          {/* 소셜 링크 */}
          <div className="space-y-4">
            <h3 className="font-semibold">연결하기</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 개발자 이름. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
