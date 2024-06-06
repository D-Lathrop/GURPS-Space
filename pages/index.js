// npx create-next-app (project folder name)
// npm run dev
// To stop server: ctrl+c

import BattleMap from "@/components/battle-map";
import ControlPanel from "@/components/control-panel";

const Index = () => {

  return (
    <>
      <BattleMap />
      <ControlPanel />
    </>
  )
}

export default Index;