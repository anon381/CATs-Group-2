import { cookies } from "next/headers"
import { SidebarNav } from "./sidebar-nav"
import { ChangeButton } from "./change-button"

type PatientProfile = {
  name?: string
  email?: string
  doctor?: { name?: string; specialty?: string; phone?: string; email?: string }
  data?: { weight?: string; height?: string; blood?: string }
}

const getInitials = (name?: string) => {
  if (!name) return "--"
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "--"
}

async function getPatientFromAuth(): Promise<PatientProfile | null> {
  try {
    const store = await cookies()
    const raw = store.get("patient_profile")?.value
    if (!raw) return null

    // Some auth providers URI-encode cookie payloads; decode defensively.
    const decoded = (() => {
      try {
        return decodeURIComponent(raw)
      } catch {
        return raw
      }
    })()

    return JSON.parse(decoded) as PatientProfile
  } catch {
    // Swallow any malformed cookie or parsing issues to avoid noisy console errors.
    return null
  }
}

export default async function PatientDashboard() {
  const patient = (await getPatientFromAuth()) ?? {}
  const patientName = patient.name || "Patient"
  const patientEmail = patient.email || ""
  const patientInitials = getInitials(patientName)
  const doctorName = patient.doctor?.name || "Your doctor"
  const doctorSpecialty = patient.doctor?.specialty || "Care team"
  const doctorPhone = patient.doctor?.phone || "+1-000-000-0000"
  const doctorEmail = patient.doctor?.email || patientEmail || "care@example.com"
  const dataWeight = patient.data?.weight || "--"
  const dataHeight = patient.data?.height || "--"
  const dataBlood = patient.data?.blood || "--"
  const reminders = [
    { title: "Order drugs", detail: "Refill prescription", when: "07.06.2025" },
    { title: "Start course", detail: "Begin new regimen", when: "10.06.2025" },
    { title: "Blood test", detail: "Routine labs", when: "12.06.2025" },
    { title: "Diagnostic", detail: "CT scan follow-up", when: "01.09.2025" },
    { title: "Took tests", detail: "Awaiting results", when: "08.09.2025" },
    { title: "Consultation", detail: "General review", when: "14.09.2025" },
    { title: "Diagnostic", detail: "Echo review", when: "20.09.2025" },
  ]

  const navItems = [
    { label: "Overview", href: "#overview" },
    { label: "Doctor", href: "#doctor" },
    { label: "Health Data", href: "#data" },
    { label: "Actions", href: "#actions" },
    { label: "Reminders", href: "#reminders" },
  ]

  const quickActions = [
    { title: "Diagnostic", desc: "List of diseases" },
    { title: "Drugs", desc: "Archive of tests" },
    { title: "Tests", desc: "Prescribed medicine" },
  ]

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="flex min-h-screen">
        {/* Fixed left sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-72 flex flex-col justify-between border-r border-slate-200 bg-white px-6 py-7 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-sm font-semibold text-blue-700">
                {patientInitials}
              </div>
              <div>
                <p className="font-semibold">{patientName}</p>
                {patientEmail ? <p className="text-xs text-slate-500">{patientEmail}</p> : null}
              </div>
            </div>

            <SidebarNav items={navItems} />
          </div>

          <div className="space-y-2 text-sm">
            <a href="#" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">Account</a>
            <a href="#" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">Settings</a>
            <a href="#" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">Help center</a>
          </div>
        </aside>

        {/* Main and right column */}
        <div className="flex-1 ml-72">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">
            <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
              {/* Center content */}
              <div className="space-y-6">
                {/* Header */}
                <div id="overview" className="flex flex-col gap-4 scroll-m-24 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-1">
                    <h1 className="text-3xl font-bold">Hello, {patientName}!</h1>
                    <p className="text-sm text-slate-500">How are you feeling today?</p>
                  </div>
                  <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="flex-1 lg:w-64">
                      <input
                        type="text"
                        placeholder="Global search"
                        className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <button className="h-10 w-10 rounded-full border border-slate-200 bg-white shadow-sm" aria-label="Notifications" />
                  </div>
                </div>

                {/* Row 1: two cards */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div id="doctor" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm scroll-m-24">
                    <div className="flex items-center justify-between mb-3 text-sm text-slate-500">
                      <span>Your doctor</span>
                      <ChangeButton label="Change" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-sm font-semibold text-blue-700">
                        {getInitials(doctorName)}
                      </div>
                      <div>
                        <p className="font-semibold">{doctorName}</p>
                        <p className="text-xs text-slate-500">{doctorSpecialty}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-blue-600">
                      <a href={`tel:${doctorPhone}`} className="rounded-full bg-blue-50 px-2 py-1">Call</a>
                      <a href={`mailto:${doctorEmail}`} className="rounded-full bg-blue-50 px-2 py-1">Chat</a>
                      <a href={`mailto:${doctorEmail}?subject=Video%20Visit%20Request`} className="rounded-full bg-blue-50 px-2 py-1">Video</a>
                    </div>
                  </div>

                  <div id="data" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm scroll-m-24">
                    <div className="flex items-center justify-between mb-3 text-sm text-slate-500">
                      <span>Your data</span>
                      <ChangeButton label="Change" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-sm text-slate-500">Weight</p>
                        <p className="text-lg font-semibold">{dataWeight}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Height</p>
                        <p className="text-lg font-semibold">{dataHeight}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Blood</p>
                        <p className="text-lg font-semibold">{dataBlood}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: feature box */}
                <div id="actions" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm scroll-m-24">
                  <div className="grid gap-6 lg:grid-cols-5 items-center">
                    <div className="lg:col-span-2 flex items-center justify-center">
                      <div className="w-full max-w-xs rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-100 p-10">
                        <div className="h-28 w-full rounded-2xl border border-dashed border-blue-200 bg-white/70" />
                      </div>
                    </div>
                    <div className="lg:col-span-3 grid gap-4 md:grid-cols-3">
                      {quickActions.map((item) => (
                        <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                          <p className="text-sm font-semibold">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right reminders */}
              <div className="space-y-6">
                <div id="reminders" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm scroll-m-24">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-slate-500">Remind me</p>
                      <p className="text-xs text-blue-600 font-semibold">4 tasks completed out of 10</p>
                    </div>
                    <a href="#" className="text-xs text-blue-600 font-semibold">This week</a>
                  </div>
                  <div className="space-y-3 text-sm text-slate-600">
                    {reminders.map((item) => (
                      <div key={item.title} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                        <div className="flex justify-between font-semibold">
                          <span>{item.title}</span>
                          <a href="#reminders" className="text-blue-600 text-xs">Change</a>
                        </div>
                        <p className="text-xs text-slate-500">{item.detail}</p>
                        <p className="text-xs text-slate-400">{item.when}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
