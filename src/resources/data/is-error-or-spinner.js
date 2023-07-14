import { ErrorMessage } from "../../components/errorMessage/ErrorMessage"
import { Spinner } from "../../components/spinner/Spinner"

export const isErrorOrSpinner = (loading, error) => {
  if (loading) {
    return <Spinner />
  }
  if (error) {
    return <ErrorMessage />
  }
}