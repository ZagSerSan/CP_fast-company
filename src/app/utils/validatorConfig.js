// конфигурация валидатора формы страницы Login.jsx
export const validatorLogin = {
  mail: {
    isRequired: {
      message: 'Mail is required!'
    },
    isMail: {
      message: 'Mail is not correct!'
    },
  },
  password: {
    isRequired: {
      message: 'Password is required!'
    }
  }
}