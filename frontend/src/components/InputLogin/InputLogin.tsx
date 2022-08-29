export default function InputLogin({
  type,
  placeholder,
  handleFunction
}: {
  type: string
  placeholder: string
  handleFunction: Function
}) {
  return (
    <input
      type={type}
      onChange={(e) => handleFunction(e.target.value)}
      placeholder={placeholder}
      className="block px-4 py-2 mt-2 input input-bordered w-full"
    />
  )
}
