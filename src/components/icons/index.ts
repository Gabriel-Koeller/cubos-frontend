// Tipos
export type { IconProps, IconWithStrokeProps } from './types';

// Ícones
export { SunIcon } from './SunIcon';
export { MoonIcon } from './MoonIcon';
export { FilterIcon } from './FilterIcon';
export { ReactIcon } from './ReactIcon';
export { SearchIcon } from './SearchIcon';
export { LogoutIcon } from './LogoutIcon';
export { ChevronLeftIcon } from './ChevronLeftIcon';
export { StarIcon } from './StarIcon';

// Imports for re-export object
import { SunIcon } from './SunIcon';
import { MoonIcon } from './MoonIcon';
import { FilterIcon } from './FilterIcon';
import { ReactIcon } from './ReactIcon';
import { SearchIcon } from './SearchIcon';
import { LogoutIcon } from './LogoutIcon';
import { ChevronLeftIcon } from './ChevronLeftIcon';
import { StarIcon } from './StarIcon';

// Re-export para facilitar imports
export const Icons = {
  Sun: SunIcon,
  Moon: MoonIcon,
  Filter: FilterIcon,
  React: ReactIcon,
  Search: SearchIcon,
  Logout: LogoutIcon,
  ChevronLeft: ChevronLeftIcon,
  Star: StarIcon,
} as const; 