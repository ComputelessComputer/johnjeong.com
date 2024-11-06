"use client";

import { getCalApi } from "@calcom/embed-react";
import { type ReactNode, useEffect } from "react";

export default function CalDotCom({ children }: { children: ReactNode }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <span
      data-cal-namespace="30min"
      data-cal-link="johnjeong/30min"
      data-cal-config='{"layout":"month_view"}'
    >
      {children}
    </span>
  );
}
