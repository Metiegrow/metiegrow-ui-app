// Centralized post-login routing based on user type/roles

export const roleToRoute = {
  student: '/app/student-dashboard',
  user: '/app/student-dashboard',
  mentor: '/app/mentor-dashboard',
  lawyer: '/app/lawyer-dashboard',
  'hr-recruiter': '/app/recruiter-dashboard',
  owner: '/app/landlord-dashboard',
  landlord: '/app/landlord-dashboard',
  alumni: '/app/alumni-dashboard',
  hr: '/app/recruiter-dashboard',
  realestate: '/app/landlord-dashboard',
};

function normalizeUserType(loginResponse) {
  // Check for roles array first (backend returns roles as array of RoleResponseDTO objects)
  const roles = loginResponse?.roles || loginResponse?.data?.roles;
  if (Array.isArray(roles) && roles.length > 0) {
    // Extract the role string from the first RoleResponseDTO object
    const firstRole = roles[0];
    if (typeof firstRole === 'object' && firstRole.role) {
      return String(firstRole.role).toLowerCase();
    } else if (typeof firstRole === 'string') {
      return String(firstRole).toLowerCase();
    }
  }

  // Fallback to other possible structures
  const type = loginResponse?.userType || loginResponse?.data?.userType;
  if (type) return String(type).toLowerCase();

  const authorities = loginResponse?.authorities || loginResponse?.data?.authorities;
  if (Array.isArray(authorities) && authorities.length) return String(authorities[0]).toLowerCase();

  return undefined;
}

export function routeAfterLogin(navigate, loginResponse) {
  console.log('Login response:', loginResponse);
  const userType = normalizeUserType(loginResponse);
  console.log('Normalized user type:', userType);
  const target = roleToRoute[userType] || '/';
  console.log('Target route:', target);
  navigate({ to: target });
}
