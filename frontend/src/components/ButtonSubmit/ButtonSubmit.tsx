export default function ButtonSubmit({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:bg-violet-600"
    >
      {text}
    </button>
  )
}
