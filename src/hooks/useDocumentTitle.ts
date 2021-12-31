import { useRef, useEffect } from 'react'

const useDocumentTitle = (title: string, prevailOnUnmount = false) => {
  const defaultTitle = useRef(document.title)

  useEffect(() => {
    document.title = 'Netflix - ' + title
  }, [title])

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current
      }
    },
    [],
  )
}

export default useDocumentTitle
