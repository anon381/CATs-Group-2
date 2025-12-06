"use client"

type Props = {
  label?: string
  onClick?: () => void
}

export function ChangeButton({ label = "Change", onClick }: Props) {
  const handleClick = () => {
    if (onClick) onClick()
    else alert("Edit flow goes here")
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-blue-600 font-semibold text-xs underline underline-offset-2"
    >
      {label}
    </button>
  )
}
