import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// 요청 검증 스키마
const contactSchema = z.object({
  name: z.string().min(2, "이름은 2글자 이상이어야 합니다"),
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  company: z.string().optional(),
  message: z.string()
    .min(10, "메시지는 10글자 이상이어야 합니다")
    .max(1500, "메시지는 1500글자 이하로 작성해주세요"),
})

// 간단한 rate limiting을 위한 메모리 저장소
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Rate limiting 함수
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 10 * 60 * 1000 // 10분
  const maxRequests = 5

  const current = rateLimitMap.get(ip)
  
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (current.count >= maxRequests) {
    return false
  }
  
  current.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting 체크
    const ip = request.headers.get("x-forwarded-for") ?? 
               request.headers.get("x-real-ip") ?? 
               "unknown"
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "너무 많은 요청입니다. 잠시 후 다시 시도해주세요." },
        { status: 429 }
      )
    }

    // 요청 데이터 파싱 및 검증
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // 실제 구현에서는 여기서 이메일 전송 등의 로직을 수행
    console.log("Contact form submission:", {
      ...validatedData,
      timestamp: new Date().toISOString(),
      ip
    })

    // 이메일 전송 예시 (실제 구현에서는 nodemailer, SendGrid 등 사용)
    // await sendEmail({
    //   to: "your-email@example.com",
    //   subject: `새로운 문의: ${validatedData.name}`,
    //   html: generateEmailTemplate(validatedData)
    // })

    // Google Sheets나 Notion에 저장하는 예시
    // await saveToSheet(validatedData)

    return NextResponse.json(
      { message: "메시지가 성공적으로 전송되었습니다." },
      { status: 200 }
    )

  } catch (error) {
    console.error("Contact form error:", error)

    // Zod 검증 에러
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "입력 데이터가 올바르지 않습니다.", details: error.issues },
        { status: 400 }
      )
    }

    // 일반적인 서버 에러
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    )
  }
}

// 이메일 템플릿 생성 함수 (예시)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateEmailTemplate(data: z.infer<typeof contactSchema>): string {
  return `
    <h2>새로운 문의가 도착했습니다</h2>
    <p><strong>이름:</strong> ${data.name}</p>
    <p><strong>이메일:</strong> ${data.email}</p>
    ${data.company ? `<p><strong>회사:</strong> ${data.company}</p>` : ''}
    <p><strong>메시지:</strong></p>
    <p style="white-space: pre-wrap;">${data.message}</p>
    <hr>
    <p><small>전송 시간: ${new Date().toLocaleString('ko-KR')}</small></p>
  `
}

