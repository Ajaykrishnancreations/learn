export const getUserDetails = (): string | null => {
  const getAuth = localStorage.getItem('auth');
  return getAuth;
};

export const SideNavConfigs = {
  Home: true,
  Profile:true,
  Community:true
} as const;
