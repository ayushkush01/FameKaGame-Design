"use client";

import { ArrowRight } from "@gravity-ui/icons";
import { Button, Card, Input } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

export default function AuthPage() {
  const router = useRouter();

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/dashboard");
  };

  return (
    <main className="grid min-h-screen bg-[#0b0b0b] text-white lg:grid-cols-2">
      {/* Left brand side */}
      <section className="relative hidden flex-col justify-between p-12 lg:flex">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 25% 30%, rgba(212,175,55,0.18), transparent 55%), linear-gradient(180deg, #0b0b0b 0%, #111111 100%)",
          }}
        />

        <div className="relative">
          <Image
            alt="Fame Ka Game"
            className="h-12 w-auto"
            height={48}
            priority
            src="/logo-bg-dark.svg"
            width={212}
          />
        </div>

        <div className="relative max-w-md">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white">
            Manage the show from audition to finale.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/50">
            The admin dashboard for Fame Ka Game — Season 1.
          </p>
        </div>

        <p className="relative text-xs text-white/30">
          Organised by Ekshot Film Production
        </p>
      </section>

      {/* Right login side */}
      <section className="flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-sm border-0 bg-transparent shadow-none">
          <Card.Header className="flex-col items-start gap-5 px-0">
            <div className="flex items-center gap-3 lg:hidden">
              <Image
                alt="Fame Ka Game"
                className="h-10 w-auto"
                height={40}
                priority
                src="/logo-bg-dark.svg"
                width={176}
              />
            </div>
            <div>
              <Card.Title className="text-2xl font-semibold text-white">
                Sign in
              </Card.Title>
              <Card.Description className="mt-1 text-sm text-white/45">
                Welcome back. Please enter your details.
              </Card.Description>
            </div>
          </Card.Header>

          <form onSubmit={signIn}>
            <Card.Content className="gap-4 px-0">
              <label className="space-y-1.5 text-sm">
                <span className="text-white/70">Email</span>
                <Input
                  aria-label="Email"
                  className="!bg-white/[0.05] text-white placeholder:text-white/40"
                  defaultValue="omi@famekagame.co"
                  fullWidth
                  required
                  type="email"
                  variant="secondary"
                />
              </label>
              <label className="space-y-1.5 text-sm">
                <span className="text-white/70">Password</span>
                <Input
                  aria-label="Password"
                  className="!bg-white/[0.05] text-white placeholder:text-white/40"
                  defaultValue="ticketdashboard"
                  fullWidth
                  required
                  type="password"
                  variant="secondary"
                />
              </label>
            </Card.Content>
            <Card.Footer className="flex-col gap-4 px-0 pt-2">
              <Button
                fullWidth
                className="bg-[#d4af37] text-black hover:bg-[#c7a22e]"
                type="submit"
              >
                Sign in
                <ArrowRight className="size-4" strokeWidth={2} />
              </Button>
              <p className="text-center text-xs text-white/30">
                Need access?{" "}
                <a
                  className="text-white/60 hover:text-white"
                  href="mailto:Fame.ka.game2626@gmail.com"
                >
                  Contact support
                </a>
              </p>
            </Card.Footer>
          </form>
        </Card>
      </section>
    </main>
  );
}
