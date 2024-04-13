import { MJPUser, MJPUserRoles } from "./UserContext";


export type AuthPolicy = (user: MJPUser) => boolean;

//Only admins can access this
export const AdminPolicy = function(user: MJPUser) {
    return user.role == MJPUserRoles.Admin;
}

//Only staff can access that
export const StaffPolicy = function(user:  MJPUser) {
    //Admin can access any page
    return (user.role == MJPUserRoles.Admin) ||
        (user.role == MJPUserRoles.Staff);
}

// Only compnay/staff can access that
export const CompanyPolicy = function(user:  MJPUser) {
    //Admin can access any page
    return (user.role == MJPUserRoles.Admin) ||
        (user.role == MJPUserRoles.Staff) ||
        (user.role == MJPUserRoles.CompanyUser);
}

//Only students can access this
export const ApplicantPolicy = function(user:  MJPUser) {
    return user.role == MJPUserRoles.Applicant;
}