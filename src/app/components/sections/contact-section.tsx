"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Phone, MapPin, Calendar } from "lucide-react"

// 폼 검증 스키마
const contactSchema = z.object({
  name: z.string().min(2, "이름은 2글자 이상이어야 합니다"),
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  company: z.string().optional(),
  message: z.string()
    .min(10, "메시지는 10글자 이상이어야 합니다")
    .max(1500, "메시지는 1500글자 이하로 작성해주세요"),
})

type ContactForm = z.infer<typeof contactSchema>

// 연락처 정보
const contactInfo = [
  {
    icon: Mail,
    label: "이메일",
    value: "your.email@example.com",
    href: "mailto:your.email@example.com"
  },
  {
    icon: Phone,
    label: "전화",
    value: "+82 10-1234-5678",
    href: "tel:+821012345678"
  },
  {
    icon: MapPin,
    label: "위치",
    value: "서울, 대한민국",
    href: "#"
  },
  {
    icon: Calendar,
    label: "상담 예약",
    value: "Calendly 링크",
    href: "https://calendly.com/yourusername"
  }
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // 실제 구현에서는 API 엔드포인트로 전송
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus("success")
        reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Contact form error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 섹션 헤더 */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            연락하기
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            새로운 프로젝트나 협업 기회에 대해 이야기하고 싶으시다면
            언제든지 연락주세요. 빠른 시일 내에 답변드리겠습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 연락처 정보 */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">연락처 정보</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{info.label}</p>
                        <a
                          href={info.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* CTA 카드 */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <MessageSquare className="w-5 h-5" />
                  빠른 응답 보장
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  보통 24시간 이내에 답변드리며, 
                  긴급한 사안의 경우 더 빠른 응답이 가능합니다.
                  프로젝트 상담, 기술 문의, 협업 제안 모두 환영합니다.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 연락 폼 */}
          <Card>
            <CardHeader>
              <CardTitle>메시지 보내기</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* 이름 */}
                <div className="space-y-2">
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="홍길동"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* 이메일 */}
                <div className="space-y-2">
                  <Label htmlFor="email">이메일 *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="hong@example.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* 회사/조직 */}
                <div className="space-y-2">
                  <Label htmlFor="company">회사/조직 (선택)</Label>
                  <Input
                    id="company"
                    {...register("company")}
                    placeholder="회사명 또는 조직명"
                  />
                </div>

                {/* 메시지 */}
                <div className="space-y-2">
                  <Label htmlFor="message">메시지 *</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="프로젝트에 대해 자세히 설명해주세요. 예산, 일정, 요구사항 등을 포함해주시면 더 정확한 답변을 드릴 수 있습니다."
                    rows={6}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* 제출 버튼 */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      전송 중...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      메시지 보내기
                    </>
                  )}
                </Button>

                {/* 상태 메시지 */}
                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200">
                    <CheckCircle className="w-5 h-5" />
                    <span>메시지가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                    <AlertCircle className="w-5 h-5" />
                    <span>메시지 전송에 실패했습니다. 다시 시도해주세요.</span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

