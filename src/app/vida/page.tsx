import { VidaGame } from '@/game/vida/VidaGame';

export const metadata = {
  title: 'VIDA · Android/Web Preview',
  description: 'Vista jugable de VIDA optimizada para escritorio y pantalla táctil.',
};

export default function VidaPage() {
  return <VidaGame />;
}
