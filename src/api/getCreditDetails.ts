import { CreditDetails, creditID } from 'types/creditdetails'

export const getCreditDetails = async (
  creditID: creditID,
): Promise<CreditDetails> => {
  try {
    const data = await fetch(
      `https://flask-netflix-api.herokuapp.com/api/credit?credit_id=${creditID}`,
    )
    const json = await data.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Credit Details')
  }
}
