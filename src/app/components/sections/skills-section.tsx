"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"

// 스킬 데이터 타입
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Skill {
  name: string
  level: number // 1-5
  years: number
  category: string
  lastUsed: string
  isRecent: boolean
}

// 스킬 카테고리별 데이터
const skillCategories = {
  "프론트엔드": [
    { name: "React", level: 5, years: 3, category: "프론트엔드", lastUsed: "2024-01", isRecent: true },
    { name: "Next.js", level: 5, years: 2, category: "프론트엔드", lastUsed: "2024-01", isRecent: true },
    { name: "TypeScript", level: 4, years: 2.5, category: "프론트엔드", lastUsed: "2024-01", isRecent: true },
    { name: "Tailwind CSS", level: 5, years: 2, category: "프론트엔드", lastUsed: "2024-01", isRecent: true },
    { name: "Vue.js", level: 4, years: 1.5, category: "프론트엔드", lastUsed: "2023-10", isRecent: false },
    { name: "JavaScript", level: 5, years: 3.5, category: "프론트엔드", lastUsed: "2024-01", isRecent: true },
  ],
  "백엔드": [
    { name: "Node.js", level: 4, years: 2, category: "백엔드", lastUsed: "2024-01", isRecent: true },
    { name: "Express.js", level: 4, years: 2, category: "백엔드", lastUsed: "2023-12", isRecent: true },
    { name: "MongoDB", level: 3, years: 1.5, category: "백엔드", lastUsed: "2023-11", isRecent: false },
    { name: "PostgreSQL", level: 3, years: 1, category: "백엔드", lastUsed: "2023-12", isRecent: true },
    { name: "Prisma", level: 4, years: 1, category: "백엔드", lastUsed: "2024-01", isRecent: true },
  ],
  "도구 & 기타": [
    { name: "Git", level: 5, years: 3.5, category: "도구", lastUsed: "2024-01", isRecent: true },
    { name: "Docker", level: 3, years: 1, category: "도구", lastUsed: "2023-12", isRecent: true },
    { name: "AWS", level: 3, years: 1.5, category: "도구", lastUsed: "2023-11", isRecent: false },
    { name: "Vercel", level: 4, years: 2, category: "도구", lastUsed: "2024-01", isRecent: true },
    { name: "Figma", level: 4, years: 2.5, category: "디자인", lastUsed: "2024-01", isRecent: true },
  ]
}

// 레벨을 텍스트로 변환
const getLevelText = (level: number): string => {
  const levels = ["초급", "초중급", "중급", "중고급", "고급"]
  return levels[level - 1] || "초급"
}

// 레벨에 따른 색상 반환
const getLevelColor = (level: number): string => {
  if (level >= 4) return "text-green-600 dark:text-green-400"
  if (level >= 3) return "text-blue-600 dark:text-blue-400"
  return "text-yellow-600 dark:text-yellow-400"
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 섹션 헤더 */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            기술 스택
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            끊임없는 학습과 실무 경험을 통해 쌓아온 기술들입니다.
            각 기술의 숙련도와 사용 경험을 확인해보세요.
          </p>
        </div>

        {/* 스킬 카테고리별 그리드 */}
        <div className="space-y-12">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-2xl font-semibold mb-6 text-center lg:text-left">
                {category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <Card 
                    key={skill.name}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {skill.name}
                        </CardTitle>
                        {skill.isRecent && (
                          <Badge variant="secondary" className="text-xs">
                            최근 사용
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* 숙련도 표시 */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">숙련도</span>
                          <span className={`font-medium ${getLevelColor(skill.level)}`}>
                            {getLevelText(skill.level)}
                          </span>
                        </div>
                        <Progress value={skill.level * 20} className="h-2" />
                      </div>

                      {/* 경험 년수 */}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">경험</span>
                        <span className="font-medium">{skill.years}년</span>
                      </div>

                      {/* 최근 사용일 */}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">최근 사용</span>
                        <span className="font-medium">{skill.lastUsed}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 학습 현황 */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">현재 학습 중</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-3">
                {["Python", "Go", "Rust", "GraphQL", "Kubernetes"].map((tech) => (
                  <Badge key={tech} variant="outline" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                새로운 기술에 대한 호기심을 가지고 지속적으로 학습하고 있습니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

