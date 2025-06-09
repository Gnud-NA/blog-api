export const Roles = {
  Admin: 'admin',
  Writer: 'writer',
  Reader: 'reader',
} as const;

export type RoleKeys = (typeof Roles)[keyof typeof Roles];
