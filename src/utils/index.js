export const getUserInformation = () => {
  return {username: localStorage.getItem('username'), user_id: localStorage.getItem('user_id')}
}