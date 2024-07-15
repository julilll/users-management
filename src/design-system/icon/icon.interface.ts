import { ICONS_PATHS } from "./icons-collection";

export const ICONS = ['first_page', 'last_page', 'arrow_left', 'arrow_right', 'save', 'add', 'grid_view', 'list_view', 'search', 'close', 'delete', 'edit', 'star-empty', 'star-filled'] as const;
export type IconName = typeof ICONS[number];

export const icons: { name: IconName; paths: { d: string }[] }[] = ICONS_PATHS.map(({ name, paths}) => ({ name: name as IconName, paths }))
export const iconNames: IconName[] = ICONS_PATHS.map(({ name }) => name as IconName);
