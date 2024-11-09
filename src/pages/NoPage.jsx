import { BugOff } from "lucide-react"


const NoPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="inline-flex items-center gap-2 text-9xl">404</h1>
      <h2 className="text-red-500"><BugOff size={96}/></h2>
      <p>oops, you just encountered a bug...</p>
      <p>can&apos;t find the page you are looking for :(</p>
    </div>
  )
}

export default NoPage