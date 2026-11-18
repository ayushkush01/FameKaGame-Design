"use client";

import { ArrowRight, CrownDiamond } from "@gravity-ui/icons";
import { Button, Card, Input } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { CSSProperties, FormEvent } from "react";

const seasonStats = [
  { label: "Episodes", value: "16" },
  { label: "Contestants", value: "360" },
  { label: "Cities", value: "All India" },
];

const talentTags = [
  "Singing",
  "Dancing",
  "Rapping",
  "Beatboxing",
  "Acting",
  "Magic",
  "Comedy",
  "Instruments",
  "Folk",
];

export default function AuthPage() {
  const router = useRouter();

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/dashboard");
  };

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-[#0a0a0a] text-white lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
      {/* Cinematic black + gold background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 18% 20%, rgba(212,175,55,0.28), transparent 45%), radial-gradient(circle at 82% 78%, rgba(212,175,55,0.16), transparent 50%), linear-gradient(135deg, #060606 0%, #111111 55%, #0a0a0a 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #ffffff 0 1px, transparent 1px 120px), repeating-linear-gradient(0deg, #ffffff 0 1px, transparent 1px 120px)",
        }}
      />

      {/* Left brand panel */}
      <section className="relative z-10 hidden flex-col justify-between p-10 lg:flex">
        <div className="flex items-center gap-4">
          <Image
            alt="Fame Ka Game"
            className="h-16 w-auto drop-shadow-[0_4px_20px_rgba(212,175,55,0.35)]"
            height={64}
            priority
            src="/logo-bg-dark.svg"
            width={282}
          />
        </div>

        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#f3d77a]">
            <CrownDiamond className="size-4" />
            Season 1 · Bilaspur, Chhattisgarh
          </div>
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Where India&apos;s{" "}
            <span className="bg-gradient-to-r from-[#f3d77a] via-[#d4af37] to-[#b8860b] bg-clip-text text-transparent">
              talent becomes fame
            </span>
            .
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            The official admin workspace for Fame Ka Game — 16 episodes, 360
            contestants, auditions to the grand finale. Manage registrations,
            audience passes, payouts, and reports.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {talentTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {seasonStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-[#f3d77a]">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/40">
          Organised by Ekshot Film Production · {new Date().getFullYear()}
        </p>
      </section>

      {/* Right login panel */}
      <section className="relative z-10 flex items-center justify-center px-6 py-12">
        <Card
          className="w-full max-w-md border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md"
          style={
            {
              "--field-background": "rgba(255,255,255,0.06)",
              "--field-foreground": "#ffffff",
              "--field-placeholder": "rgba(255,255,255,0.45)",
            } as CSSProperties
          }
        >
          <Card.Header className="flex-col items-start gap-4 pb-2">
            <div className="flex items-center gap-3 lg:hidden">
              <Image
                alt="Fame Ka Game"
                className="h-12 w-auto"
                height={48}
                priority
                src="/logo-bg-dark.svg"
                width={212}
              />
            </div>
            <div>
              <Card.Title className="text-2xl font-semibold text-white">
                Welcome back
              </Card.Title>
              <Card.Description className="text-white/55">
                Sign in to access the Fame Ka Game admin dashboard.
              </Card.Description>
            </div>
          </Card.Header>

          <form onSubmit={signIn}>
            <Card.Content className="gap-5">
              <label className="space-y-2 text-sm">
                <span className="text-white/70">Email</span>
                <Input
                  aria-label="Email"
                  className="!bg-white/[0.06] text-white placeholder:text-white/40"
                  defaultValue="omi@famekagame.co"
                  fullWidth
                  required
                  type="email"
                  variant="secondary"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-white/70">Password</span>
                <Input
                  aria-label="Password"
                  className="!bg-white/[0.06] text-white placeholder:text-white/40"
                  defaultValue="ticketdashboard"
                  fullWidth
                  required
                  type="password"
                  variant="secondary"
                />
              </label>
              <div className="flex items-center justify-between text-xs">
                <label className="flex cursor-pointer items-center gap-2 text-white/60">
                  <input type="checkbox" className="accent-[#d4af37]" />
                  Remember me
                </label>
                <a className="text-[#f3d77a] hover:underline" href="#">
                  Forgot password?
                </a>
              </div>
            </Card.Content>
            <Card.Footer className="mt-2 flex-col gap-3">
              <Button
                fullWidth
                className="bg-gradient-to-r from-[#f3d77a] via-[#d4af37] to-[#b8860b] text-black shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)] hover:brightness-110"
                type="submit"
              >
                Sign in
                <ArrowRight className="size-4" strokeWidth={2} />
              </Button>
              <p className="text-center text-xs text-white/40">
                Need access? Contact{" "}
                <a
                  className="text-[#f3d77a] hover:underline"
                  href="mailto:Fame.ka.game2626@gmail.com"
                >
                  Fame.ka.game2626@gmail.com
                </a>
              </p>
            </Card.Footer>
          </form>
        </Card>
      </section>
    </main>
  );
}
