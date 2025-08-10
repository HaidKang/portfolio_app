"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ExternalLink, Github, Filter } from "lucide-react"

// 프로젝트 데이터 타입
interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: string
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  metrics?: {
    label: string
    value: string
  }[]
}

// 샘플 프로젝트 데이터
const projects: Project[] = [
  {
    id: "1",
    title: "E-커머스 플랫폼",
    description: "React와 Next.js로 구축한 현대적인 온라인 쇼핑몰",
    longDescription: "사용자 친화적인 UI/UX와 효율적인 상태 관리를 통해 매출을 30% 증가시킨 E-커머스 플랫폼입니다.",
    image: "/api/placeholder/600/400",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    category: "웹 애플리케이션",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/username/project",
    featured: true,
    metrics: [
      { label: "매출 증가", value: "30%" },
      { label: "로딩 속도", value: "2.1s" },
      { label: "사용자 만족도", value: "4.8/5" }
    ]
  },
  {
    id: "2",
    title: "태스크 관리 대시보드",
    description: "팀 협업을 위한 실시간 프로젝트 관리 도구",
    longDescription: "드래그 앤 드롭 기능과 실시간 동기화를 제공하는 프로젝트 관리 대시보드입니다.",
    image: "/api/placeholder/600/400",
    technologies: ["Vue.js", "Node.js", "Socket.io", "MongoDB", "Express"],
    category: "대시보드",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/username/project",
    featured: true,
    metrics: [
      { label: "생산성 향상", value: "45%" },
      { label: "실시간 동기화", value: "99.9%" }
    ]
  },
  {
    id: "3",
    title: "모바일 금융 앱",
    description: "React Native로 개발한 개인 자산 관리 애플리케이션",
    longDescription: "직관적인 차트와 AI 기반 투자 추천 기능을 제공하는 모바일 금융 앱입니다.",
    image: "/api/placeholder/600/400",
    technologies: ["React Native", "TypeScript", "Redux", "Chart.js"],
    category: "모바일 앱",
    githubUrl: "https://github.com/username/project",
    featured: false,
    metrics: [
      { label: "다운로드", value: "10k+" },
      { label: "평점", value: "4.7/5" }
    ]
  },
  {
    id: "4",
    title: "블로그 플랫폼",
    description: "개발자를 위한 기술 블로그 플랫폼",
    longDescription: "마크다운 에디터와 코드 하이라이팅을 지원하는 개발자 친화적 블로그 플랫폼입니다.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
    category: "웹 애플리케이션",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/username/project",
    featured: false
  },
]

const categories = ["전체", "웹 애플리케이션", "모바일 앱", "대시보드"]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [showAll, setShowAll] = useState(false)

  const filteredProjects = projects.filter(project => 
    selectedCategory === "전체" || project.category === selectedCategory
  )

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6)

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 섹션 헤더 */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            프로젝트
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            다양한 기술 스택으로 구현한 실제 프로젝트들을 소개합니다.
            각 프로젝트의 도전과제와 해결 과정을 확인해보세요.
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              <Filter className="w-4 h-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>

        {/* 프로젝트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 프로젝트 이미지 */}
              <div className="relative overflow-hidden rounded-t-xl">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🚀</div>
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="destructive">추천</Badge>
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription>
                      {project.description}
                    </CardDescription>
                  </div>
                </div>

                {/* 기술 스택 */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                {/* 성과 지표 */}
                {project.metrics && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {project.metrics.slice(0, 2).map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-lg font-bold text-primary">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 액션 버튼 */}
                <div className="flex gap-2">
                  {project.demoUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        데모
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        코드
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 더 보기 버튼 */}
        {filteredProjects.length > 6 && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "간단히 보기" : `더 많은 프로젝트 보기 (+${filteredProjects.length - 6})`}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}


