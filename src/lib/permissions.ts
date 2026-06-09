import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

// Access-control statement (start from the admin plugin defaults; extend per
// feature phase as resources are added).
const statement = { ...defaultStatements } as const;

export const ac = createAccessControl(statement);

// Roles for Afridrop. Admin-tier roles inherit the admin plugin's
// user-management permissions; operational roles start with none.
export const customer = ac.newRole({});
export const attendant = ac.newRole({});
export const manager = ac.newRole({});
export const admin = ac.newRole({ ...adminAc.statements });
export const superAdmin = ac.newRole({ ...adminAc.statements });

export const roles = {
  super_admin: superAdmin,
  admin,
  manager,
  attendant,
  customer,
};

export type AppRole = keyof typeof roles;
