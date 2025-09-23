import { useEffect, useState } from "react";
import useTypewriter from "./useTypewriter";
import type { HoverCard } from "@/components/NavDeck/types";

const getHoverCardTitle = (h: HoverCard) => (h === 'mag' ? 'Raveneyex' : h === 'tat' ? 'Ojo de Cuervo' : 'Andres Ossa');

export default function useNavDeckTypewriter( hoverCard: HoverCard) {
  const [titleText, setTitleText] = useState('Andres Ossa');

  const { text: typedTitle, announce } = useTypewriter({ 
    defaultText: 'Andres Ossa', 
    target: hoverCard ? getHoverCardTitle(hoverCard) : null 
  });

  useEffect(() => { setTitleText(typedTitle); }, [typedTitle]);

  return { titleText, announce }
}