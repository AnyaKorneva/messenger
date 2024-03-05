export default function validation(name: string, value: string) {
  switch (name) {
    case 'first_name':
    case 'second_name':
      return /^[А-ЯЁA-Z][а-яёa-z-]*$/.test(value);

    case 'display_name':
    case 'login':
      return /^[a-zA-Z](?!.*?[0-9]{5,})[a-zA-Z0-9_-]{2,19}$/.test(value);

    case 'email':
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

    case 'oldPassword':
    case 'newPassword':
    case 'newPasswordRepeate':
    case 'password_new':
    case 'password':
      return /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/.test(value);

    case 'phone':
      return /^\+?\d{10,15}$/.test(value);

    default:
      return true;
  }
}
