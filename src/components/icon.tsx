import { ArrowDown, ArrowRight, BookOpen, Flame, HandHeart, Landmark, Leaf, MessagesSquare, Palette, Sprout, Sun, type LucideProps } from "lucide-react";

const icons = {
  sun: Sun, messages: MessagesSquare, flame: Flame, landmark: Landmark,
  book: BookOpen, hands: HandHeart, sprout: Sprout, leaf: Leaf,
  palette: Palette, arrow: ArrowRight, down: ArrowDown,
};

export function Icon({ name, ...props }: LucideProps & { name: keyof typeof icons }) {
  const Component = icons[name];
  return <Component aria-hidden="true" strokeWidth={1.5} {...props} />;
}
