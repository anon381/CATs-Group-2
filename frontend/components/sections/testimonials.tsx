import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Dr. Rita Tilaye",
    role: "Chief Doctor, Ethiopia",
    image: "/dr%20rita.png",
    quote:
      "Still early, but the referral flow already feels faster. If they land the remaining features, this could remove a lot of friction for our team.",
  },
  {
    name: "Dr. Saron Leulkal",
    role: "Health Post Coordinator, Addis Ababa",
    image: "/dr%20saron.png",
    quote:
      "We’re piloting it with a few sites. The promise of consistent patient histories across facilities is exactly what we need—looking forward to the full rollout.",
  },
  {
    name: "Ms. Nadab",
    role: "Patient, Digital Healthcare Advocate",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    quote:
      "Even in beta, seeing my records in one place is reassuring. If they keep this pace, it’ll be a game changer for patients like me.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Early words, strong promise</h2>
          <p className="text-lg text-muted-foreground">
            A project in motion—here’s what early users notice as The Spine takes shape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 italic leading-relaxed">"{testimonial.quote}"</p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
