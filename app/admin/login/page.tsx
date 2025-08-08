"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid credentials")
      } else {
        // Check if sign in was successful and get session
        const session = await getSession()
        if (session) {
          router.push("/admin")
        }
      }
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#00162D] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-[#00162D] border-[#4A5EE7]/20">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-[#4A5EE7] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-[#F7F9FF]">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center text-[#BFC9DB]">
            Sign in to access the AlegrIA Hackathon Admin Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#F7F9FF]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="davidcardecodri@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#00162D] border-[#4A5EE7]/20 text-white placeholder:text-[#BFC9DB]/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#F7F9FF]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#00162D] border-[#4A5EE7]/20 text-white placeholder:text-[#BFC9DB]/60"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#4A5EE7]/20">
            <p className="text-xs text-center text-[#BFC9DB]/70">
              Login with your admin credentials
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}