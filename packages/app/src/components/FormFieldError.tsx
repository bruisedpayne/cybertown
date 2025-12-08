import { AnyFieldMeta } from '@tanstack/react-form'

type Props = {
  meta: AnyFieldMeta
}

export function FormFieldError(props: Props) {
  const { meta } = props

  if (!meta.isTouched || !meta.errors.length) {
    return null
  }

  const error = meta.errors.map((error) => error.message).join(', ')

  return <p className="text-sm text-destructive-foreground">{error}</p>
}
