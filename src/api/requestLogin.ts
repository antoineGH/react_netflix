export const requestLogin = async (email: string, password: string) => {
  const user = { email, password }
  try {
    const response = await fetch(
      'https://flask-netflix-api.herokuapp.com/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      },
    )
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to Login')
  }
}

export default requestLogin
