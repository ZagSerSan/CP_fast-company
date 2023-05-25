export function validator (data,config) {
  const errors = {}
  function validate(validateMethod,data,config) {
    switch (validateMethod) {
      case 'isRequired':
        if (data.trim() === '') return config.message
        break
      case 'isMail': {
        const mailRegExp = /^\S+@\S+\.\S+$/g
        if (!mailRegExp.test(data)) return config.message
        break
      }
      default:
        break
    }
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      )
      if (error && !errors[fieldName])
      errors[fieldName] = error
    }
  }
  return errors
}