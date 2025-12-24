"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  city: z.string().min(2, "City name required"),
});

export default function SearchForm({ onSearch }: any) {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => onSearch(data.city))}
      className="flex gap-2"
    >
      <Input placeholder="Enter city" {...form.register("city")} />
      <Button type="submit">Search</Button>
    </form>
  );
}
    