"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface ChatflowMonitorProps {
    chatflowId: string;
}

export function ChatflowMonitor({ chatflowId }: ChatflowMonitorProps) {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const channel = supabase
            .channel(`chatflow-${chatflowId}`)
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "chatflows",
                    filter: `id=eq.${chatflowId}`,
                },
                () => {
                    router.refresh();
                }
            )
            .subscribe((status) => {
                if (status === "SUBSCRIBED") {
                    router.refresh();
                }
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [chatflowId, router, supabase]);

    return null;
}
