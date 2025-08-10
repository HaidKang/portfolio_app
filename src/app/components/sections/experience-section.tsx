"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { CalendarDays, MapPin, Trophy, GraduationCap } from "lucide-react"

// 경력 데이터 타입
interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  current: boolean
  description: string
  achievements: string[]
  technologies: string[]
}

// 교육/자격증 데이터 타입
interface Education {
  id: string
  title: string
  institution: string
  period: string
  description?: string
  type: "education" | "certification"
}

// 경력 데이터
const experiences: Experience[] = [
  {
    id: "1",
    title: "시니어 웹 개발자",
    company: "테크 스타트업",
    location: "서울, 대한민국",
    period: "2022.03 - 현재",
    current: true,
    description: "사용자 경험 최적화와 성능 개선에 집중하며 프론트엔드 아키텍처를 설계하고 개발하고 있습니다.",
    achievements: [
      "웹 애플리케이션 성능 40% 개선",
      "사용자 전환율 25% 증가",
      "코드 리뷰 문화 도입으로 버그 30% 감소",
      "주니어 개발자 3명 멘토링"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "AWS"]
  },
  {
    id: "2",
    title: "웹 개발자",
    company: "미디어 회사",
    location: "서울, 대한민국",
    period: "2021.01 - 2022.02",
    current: false,
    description: "대규모 미디어 플랫폼의 프론트엔드 개발을 담당하며 사용자 인터페이스를 구현했습니다.",
    achievements: [
      "월간 활성 사용자 100만 명 플랫폼 개발",
      "모바일 최적화로 모바일 트래픽 60% 증가",
      "A/B 테스트 도구 개발로 데이터 기반 의사결정 지원"
    ],
    technologies: ["Vue.js", "JavaScript", "SCSS", "Webpack", "Docker"]
  },
  {
    id: "3",
    title: "주니어 웹 개발자",
    company: "웹 에이전시",
    location: "서울, 대한민국",
    period: "2020.03 - 2020.12",
    current: false,
    description: "다양한 클라이언트의 웹사이트와 웹 애플리케이션을 개발하며 실무 경험을 쌓았습니다.",
    achievements: [
      "15개 이상의 클라이언트 프로젝트 완료",
      "반응형 웹 개발 전문성 확보",
      "클라이언트 만족도 평균 4.8/5.0 달성"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"]
  }
]

// 교육/자격증 데이터
const educations: Education[] = [
  {
    id: "1",
    title: "컴퓨터공학과 학사",
    institution: "서울대학교",
    period: "2016.03 - 2020.02",
    description: "웹 개발, 알고리즘, 데이터구조 등을 전공하며 탄탄한 기초를 다졌습니다.",
    type: "education"
  },
  {
    id: "2",
    title: "AWS Certified Solutions Architect",
    institution: "Amazon Web Services",
    period: "2023.06",
    type: "certification"
  },
  {
    id: "3",
    title: "정보처리기사",
    institution: "한국산업인력공단",
    period: "2020.11",
    type: "certification"
  }
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 섹션 헤더 */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            경력 & 학력
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            지속적인 성장과 학습을 통해 쌓아온 경험들입니다.
            각 단계에서의 성과와 배움을 확인해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 경력 섹션 */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <CalendarDays className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">경력</h3>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card 
                  key={exp.id}
                  className="hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">
                          {exp.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 text-base">
                          <span className="font-semibold text-foreground">
                            {exp.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </span>
                        </CardDescription>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {exp.period}
                          </span>
                          {exp.current && (
                            <Badge variant="secondary">현재</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {exp.description}
                    </p>

                    {/* 주요 성과 */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        주요 성과
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 사용 기술 */}
                    <div>
                      <h4 className="font-semibold mb-2">사용 기술</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 교육/자격증 섹션 */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">교육 & 자격증</h3>
            </div>

            <div className="space-y-6">
              {educations.map((edu, index) => (
                <Card 
                  key={edu.id}
                  className="hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${(index + experiences.length) * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">
                          {edu.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          <span className="font-semibold text-foreground">
                            {edu.institution}
                          </span>
                        </CardDescription>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {edu.period}
                          </span>
                          <Badge 
                            variant={edu.type === "education" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {edu.type === "education" ? "학위" : "자격증"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {edu.description && (
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {edu.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {/* 추가 정보 */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">기타 활동</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">개발 블로그 운영</span>
                  <Badge variant="outline" className="text-xs">2020 - 현재</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">오픈소스 기여</span>
                  <Badge variant="outline" className="text-xs">2021 - 현재</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">기술 컨퍼런스 발표</span>
                  <Badge variant="outline" className="text-xs">2023</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
