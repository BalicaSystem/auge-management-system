"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { type LoginFormData, loginSchema } from "../schema";
import { notify } from "@/lib/notify";

export function LoginForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    setIsPending(true);

    console.log(data);

    notify.success("Login realizado com sucesso!");

    setIsPending(false);

    router.push("/dashboard");
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-sm space-y-5 px-4"
    >
      <div className="space-y-1.5 text-center">
        <h1 className="font-display text-2xl font-bold tracking-[0.06em] text-foreground uppercase">
          Auge Motos
        </h1>

        <p className="text-sm text-muted-foreground">
          Entre com suas credenciais para acessar o painel.
        </p>
      </div>

      <Field data-invalid={!!form.formState.errors.email}>
        <FieldLabel htmlFor="email">E-mail</FieldLabel>

        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="voce@concessionaria.com.br"
          {...form.register("email")}
        />

        {form.formState.errors.email && (
          <FieldError>{form.formState.errors.email.message}</FieldError>
        )}
      </Field>

      <Field data-invalid={!!form.formState.errors.password}>
        <FieldLabel htmlFor="password">Senha</FieldLabel>

        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          {...form.register("password")}
        />

        {form.formState.errors.password && (
          <FieldError>{form.formState.errors.password.message}</FieldError>
        )}
      </Field>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="animate-spin" />
            Entrando...
          </>
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
}
