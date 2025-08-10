"use client"

import { Button } from "../ui/button"
import { ArrowDown, Download, MessageSquare } from "lucide-react"

export function HeroSection() {
  const handleDownloadCV = () => {
    // CV 다운로드 로직
    console.log("CV 다운로드")
  }

  const handleContact = () => {
    // 연락처 섹션으로 스크롤
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth"
    })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto max-w-7xl px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 텍스트 콘텐츠 */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <p className="text-primary font-medium text-lg tracking-wider">
                안녕하세요! 👋
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                저는{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  웹 개발자
                </span>
                입니다
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                사용자 중심의 웹 경험을 만들어가며, 
                최신 기술과 창의적인 아이디어로 
                혁신적인 디지털 솔루션을 개발합니다.
              </p>
            </div>

            {/* 주요 스킬 태그 */}
            <div className="flex flex-wrap gap-3">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleContact}
                className="group"
              >
                <MessageSquare className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                문의하기
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleDownloadCV}
                className="group"
              >
                <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
                이력서 다운로드
              </Button>
            </div>

            {/* 성과 지표 */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">완료 프로젝트</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3+</div>
                <div className="text-sm text-muted-foreground">년 경력</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">고객 만족도</div>
              </div>
            </div>
          </div>

          {/* 이미지/일러스트레이션 영역 */}
          <div className="relative animate-slide-in-left">
            <div className="relative z-10">
              {/* 코드 에디터 모킹 */}
              <div className="bg-card border rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-muted-foreground ml-2">portfolio.tsx</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-2">
                  <div className="text-blue-600 dark:text-blue-400">
                    <span className="text-purple-600 dark:text-purple-400">const</span>{" "}
                    <span className="text-yellow-600 dark:text-yellow-400">developer</span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">=</span>{" "}
                    <span className="text-green-600 dark:text-green-400">{"{"}</span>
                  </div>
                  <div className="pl-4">
                    <div>
                      <span className="text-red-600 dark:text-red-400">name</span>
                      <span className="text-gray-600 dark:text-gray-400">:</span>{" "}
                      <span className="text-green-600 dark:text-green-400">&apos;개발자 이름&apos;</span>
                      <span className="text-gray-600 dark:text-gray-400">,</span>
                    </div>
                    <div>
                      <span className="text-red-600 dark:text-red-400">role</span>
                      <span className="text-gray-600 dark:text-gray-400">:</span>{" "}
                      <span className="text-green-600 dark:text-green-400">&apos;Frontend Developer&apos;</span>
                      <span className="text-gray-600 dark:text-gray-400">,</span>
                    </div>
                    <div>
                      <span className="text-red-600 dark:text-red-400">passion</span>
                      <span className="text-gray-600 dark:text-gray-400">:</span>{" "}
                      <span className="text-green-600 dark:text-green-400">&apos;Creating Amazing UX&apos;</span>
                    </div>
                  </div>
                  <div className="text-green-600 dark:text-green-400">{"}"}</div>
                </div>
              </div>
            </div>

            {/* 배경 장식 요소 */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* 스크롤 다운 표시 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
