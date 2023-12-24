function getBaseUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_BACKEND_URL || '';
  }
  return 'http://localhost:5000';
}
export const baseUrl = getBaseUrl();
export default {};
