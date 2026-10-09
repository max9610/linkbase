"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { handleSchema } from "@/lib/validation/handle";

export function ClaimForm() {
  const router = useRouter();
  const errorId = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = handleSchema.safeParse(value);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Enter a valid username");
      return;
    }
    setError(null);
    router.push(`/sign-in?handle=${encodeURIComponent(result.data)}`);
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex max-w-[560px] flex-col gap-2"
    >
      <div className="flex flex-wrap gap-2.5">
        <label
          className={`flex h-14 min-w-0 flex-[1_1_240px] items-center rounded-md bg-lb-white px-[18px] text-[17px] focus-within:ring-2 ${error ? "ring-2 ring-lb-danger focus-within:ring-lb-danger" : "focus-within:ring-lb-ink"}`}
        >
          <span className="text-lb-stone-600">linkbase.me/</span>
          <input
            id="claim"
            name="handle"
            value={value}
            onChange={(event) => {
              setValue(
                event.target.value.replace(/[^a-z0-9._]/gi, "").toLowerCase(),
              );
              setError(null);
            }}
            placeholder="yourname"
            aria-label="Choose your username"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={30}
            className="min-w-0 flex-1 bg-transparent text-lb-ink outline-none placeholder:text-lb-stone-400"
          />
        </label>
        <Button type="submit" size="lg" className="flex-[1_1_auto]">
          Claim your Linkbase
        </Button>
      </div>
      {error ? (
        <p id={errorId} className="m-0 text-sm font-medium text-lb-danger">
          {error}
        </p>
      ) : null}
    </form>
  );
}
