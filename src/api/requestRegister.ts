import { RegisterAccount } from 'types/account'

const requestRegister = async (values: RegisterAccount) => {
  const user = {
    email: values.email,
    first_name: values.firstName,
    last_name: values.lastName,
    password: values.password,
  }
  try {
    const response = await fetch(
      'https://flask-netflix-api.herokuapp.com/api/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      },
    )
    const json = response.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to Register')
  }
}

export default requestRegister
