import { HeroWith3D } from "@/components/hero/HeroWith3D";
import { ToolsSection } from "@/components/tools/ToolsSection";
import { EngagementSection } from "@/components/engagement/EngagementSection";

export default function Home() {
  return (
    <>
      <HeroWith3D />
      <ToolsSection />
      <EngagementSection />
    </>
  );
}
