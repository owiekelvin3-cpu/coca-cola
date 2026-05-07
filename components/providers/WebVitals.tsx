"use client";
import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in dev — in production this would go to analytics
    if (process.env.NODE_ENV === "development") {
      const color = metric.rating === "good" ? "🟢" : metric.rating === "needs-improvement" ? "🟡" : "🔴";
      console.log(`${color} ${metric.name}: ${Math.round(metric.value)}ms`);
    }
  });
  return null;
}
