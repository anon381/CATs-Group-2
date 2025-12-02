import { useState } from 'react'
import Layout from '../../components/Layout'
import { requestOtp } from '../../services/auth'
import { useTranslation } from '../../utils/i18n'

export default function Login() {
  const { t } = useTranslation()

  const [step, setStep] = useState(1)
  const [role, setRole] = useState('') // 'admin' | 'doctor' | 'patient'

  // form state
  const [name, setName] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [phone, setPhone] = useState('')
  const [fad, setFad] = useState('')

  const canContinueStep1 = !!role
  const canSubmit = () => {
    if (!role) return false
    if (role === 'patient') {
      return name.trim() && age.trim() && phone.trim() && fad.trim()
    }
    // admin or doctor
    return name.trim() && identifier.trim() && password.trim()
  }

  const handleNext = (e) => {
    e?.preventDefault()
    if (!canContinueStep1) return
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit()) return alert('Please complete the form')

    // For now we stub requestOtp/use existing service for phone-based flow when available.
    // We'll package a payload depending on role.
    const payload = { role, name, identifier: (role === 'patient' ? phone : identifier), password: (role !== 'patient' ? password : undefined), age: role === 'patient' ? age : undefined, fad: role === 'patient' ? fad : undefined }
    await requestOtp(payload)
    alert(t('otpRequested'))
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <h2 className="text-2xl font-semibold mb-4">{t('loginTitle')}</h2>

        {step === 1 && (
          <div className="space-y-6">
            <p className="text-sm text-gray-600">{t('selectRolePrompt') || 'Choose how you will sign in'}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className={`p-4 border rounded cursor-pointer ${role==='admin' ? 'border-blue-600 bg-blue-50' : ''}`}>
                <input type="radio" name="role" value="admin" className="hidden" onChange={()=>setRole('admin')} checked={role==='admin'} />
                <div className="font-semibold">{t('role_admin') || 'Admin'}</div>
                <div className="text-sm text-gray-500">{t('role_admin_desc') || 'Administrator access'}</div>
              </label>
              <label className={`p-4 border rounded cursor-pointer ${role==='patient' ? 'border-blue-600 bg-blue-50' : ''}`}>
                <input type="radio" name="role" value="patient" className="hidden" onChange={()=>setRole('patient')} checked={role==='patient'} />
                <div className="font-semibold">{t('role_patient') || 'Patient'}</div>
                <div className="text-sm text-gray-500">{t('role_patient_desc') || 'Access your medical timeline'}</div>
              </label>
              <label className={`p-4 border rounded cursor-pointer ${role==='doctor' ? 'border-blue-600 bg-blue-50' : ''}`}>
                <input type="radio" name="role" value="doctor" className="hidden" onChange={()=>setRole('doctor')} checked={role==='doctor'} />
                <div className="font-semibold">{t('role_doctor') || 'Doctor'}</div>
                <div className="text-sm text-gray-500">{t('role_doctor_desc') || 'Clinician access'}</div>
              </label>
            </div>

            <div className="flex gap-3 justify-end">
              <button onClick={handleNext} disabled={!canContinueStep1} className={`px-4 py-2 rounded ${canContinueStep1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{t('continue')}</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">{t('name')}</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-3 border rounded" />
            </div>

            {role === 'patient' ? (
              <>
                <div>
                  <label className="block text-sm text-gray-700">{t('age') || 'Age'}</label>
                  <input value={age} onChange={(e)=>setAge(e.target.value)} type="number" className="w-full p-3 border rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">{t('phone') || 'Phone number'}</label>
                  <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full p-3 border rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">{t('fadNumber') || 'FAD Number'}</label>
                  <input value={fad} onChange={(e)=>setFad(e.target.value)} className="w-full p-3 border rounded" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm text-gray-700">{t('idLabel') || 'ID'}</label>
                  <input value={identifier} onChange={(e)=>setIdentifier(e.target.value)} className="w-full p-3 border rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">{t('password') || 'Password'}</label>
                  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full p-3 border rounded" />
                </div>
              </>
            )}

            <div className="flex gap-3 justify-between">
              <button type="button" onClick={()=>setStep(1)} className="px-4 py-2 rounded bg-gray-100">Back</button>
              <button type="submit" className={`px-4 py-2 rounded ${canSubmit() ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{t('continue')}</button>
            </div>
          </form>
        )}

      </div>
    </Layout>
  )
}
