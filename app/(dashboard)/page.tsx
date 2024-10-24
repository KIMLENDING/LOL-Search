import GaspTest1 from "@/components/gsap/gaspTest1";
import GaspTest2 from "@/components/gsap/gsapTest2";

export default function Page() {

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <GaspTest1 />
        <GaspTest2 />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  )
}
