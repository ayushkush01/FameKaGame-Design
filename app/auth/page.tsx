"use client";

import { ArrowRight } from "@gravity-ui/icons";
import { Button, Card, Input } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

import { AppSelect } from "@/components/app-select";

const roleOptions = ["Event Owner", "Finance Admin", "Gate Staff"].map((role) => ({
  label: role,
  value: role,
}));

export default function AuthPage() {
  const router = useRouter();
  const [role, setRole] = useState("Event Owner");

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/dashboard");
  };

  return (
    <main className="grid min-h-screen bg-background px-4 py-8 text-foreground lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.55fr)]">
      <section className="hidden min-h-[calc(100vh-4rem)] flex-col justify-between rounded-3xl bg-accent p-8 text-accent-foreground lg:flex">
        <div className="flex flex-col gap-3">
          <Image
            alt="Tixora"
            className="h-12 w-auto"
            height={48}
            priority
            src="/logo-bg-light.svg"
            width={156}
          />
        </div>

        <div className="max-w-xl">
          <p className="text-sm font-medium opacity-70">Frontend template access</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight">
            Manage events, orders, gates, and payouts from one workspace.
          </h1>
        </div>
      </section>

      <section className="flex items-center justify-center">
        <Card className="w-full max-w-md">
          <Card.Header>
            <Card.Title>Sign in</Card.Title>
            <Card.Description>Use any email to preview the dashboard template.</Card.Description>
          </Card.Header>
          <form onSubmit={signIn}>
            <Card.Content className="gap-4">
              <label className="space-y-2 text-sm">
                <span className="text-muted">Email</span>
                <Input
                  aria-label="Email"
                  defaultValue="omi@tixora.co"
                  fullWidth
                  required
                  type="email"
                  variant="secondary"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-muted">Password</span>
                <Input
                  aria-label="Password"
                  defaultValue="ticketdashboard"
                  fullWidth
                  required
                  type="password"
                  variant="secondary"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-muted">Role preview</span>
                <AppSelect
                  ariaLabel="Role preview"
                  fullWidth
                  onChange={setRole}
                  options={roleOptions}
                  value={role}
                />
              </label>
            </Card.Content>
            <Card.Footer className="flex-col gap-3 mt-4">
              <Button fullWidth type="submit">
                Login
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Button>
            </Card.Footer>
          </form>
        </Card>
      </section>
    </main>
  );
}
