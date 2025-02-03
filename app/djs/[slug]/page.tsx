import { notFound } from "next/navigation"

const djs = {
  emotep: {
    name: "Emotep",
    bio: "Master of emotional frequencies, Emotep uses his music to tap into the deepest feelings of his listeners, freeing them from Dr. Montrose's control.",
    image: "/placeholder.svg?height=300&width=300",
  },
  mortl: {
    name: "Mortl",
    bio: "With beats that shake the very foundation of reality, Mortl's music is a force of nature that shatters the chains of mind control.",
    image: "/placeholder.svg?height=300&width=300",
  },
  zylo: {
    name: "Zylo",
    bio: "Zylo's hypnotic melodies weave intricate patterns in the minds of the listeners, unraveling Dr. Montrose's influence with every note.",
    image: "/placeholder.svg?height=300&width=300",
  },
}

export default function DJProfile({ params }: { params: { slug: string } }) {
  const dj = djs[params.slug as keyof typeof djs]

  if (!dj) {
    notFound()
  }

  return (
    <div className="w-full min-h-screen bg-gray-950 px-2 py-4 sm:p-8">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-primary">{dj.name}</h1>
        <img src={dj.image || "/placeholder.svg"} alt={dj.name} className="w-64 h-64 mx-auto rounded-full" />
        <p className="text-lg text-center text-gray-300">{dj.bio}</p>
      </div>
    </div>
  )
}

