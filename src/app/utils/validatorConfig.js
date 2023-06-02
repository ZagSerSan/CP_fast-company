// конфигурация валидатора формы страницы Login.jsx
export const validatorConfig = {
  mail: {
    isRequired: {
      message: 'Mail is required!'
    },
    isMail: {
      message: 'Mail is not correct!'
    }
  },
  password: {
    isRequired: {
      message: 'Password is required!'
    },
    isCapitalSymbol: {
      message: 'Password must have Capital Symbol!'
    },
    isContainDigit: {
      message: 'Password must have digit symbol!'
    },
    isMinLenght: {
      message: 'Password must have min 8 symbols!',
      minValue: 8
    }
  },
  profession: {
    isRequired: {
      message: 'Profesion is required!'
    }
  }
}
