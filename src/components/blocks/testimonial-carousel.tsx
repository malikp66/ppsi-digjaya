"use client";

import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { PCard } from "@/components/ui";
import { fetchMock } from "@/lib/api";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

export const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchMock<Testimonial[]>("testimonials").then(setTestimonials);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (testimonials.length === 0) {
    return null;
  }

  const active = testimonials[index];

  return (
    <PCard className="relative overflow-hidden text-center">
      <Quote className="absolute -left-6 -top-6 h-24 w-24 text-heritage/10" />
      <div className="space-y-4">
        <p className="text-lg text-ink/80">“{active.quote}”</p>
        <div>
          <p className="text-sm font-semibold text-heritage">{active.name}</p>
          <p className="text-xs uppercase tracking-wide text-ink/50">
            {active.role}
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((item, idx) => (
          <button
            key={item.id}
            className={`h-2.5 w-2.5 rounded-full ${idx === index ? "bg-forest" : "bg-heritage/30"}`}
            onClick={() => setIndex(idx)}
            aria-label={`Tampilkan testimoni ${idx + 1}`}
          />
        ))}
      </div>
    </PCard>
  );
};
