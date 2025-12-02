import Link from 'next/link'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { useTranslation } from '../utils/i18n'

export default function Prelogin(){
  const { t } = useTranslation()
  const products = [
    { slug: 'claimcraft', name: t('tm2_name'), short: t('tm2_desc'), features: ['AI bill scanner','Legal-ready PDF letters','One-click print/download'], logo: '/logos/claimcraft.svg' },
    { slug: 'healthpass', name: t('tm3_name'), short: t('tm3_desc'), features: ['Encrypted QR identity','Wallet & phone compatible','Instant patient timeline access'], logo: '/logos/healthpass.svg' },
    { slug: 'equimatch', name: t('tm1_name'), short: t('tm1_desc'), features: ['Smart matching engine','Risk-aligned suggestions','Real-time alerts'], logo: '/logos/equimatch.svg' }
  ]

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center">
        <div className="max-w-4xl mx-auto py-24 px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4">{t('appName')}</h1>
          <p className="text-xl text-gray-600 mb-8">{t('tagline')}</p>

          <div className="flex gap-4 justify-center mb-8">
            <Link href="/auth/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg">Get Started</Link>
            <Link href="/products" className="px-6 py-3 bg-gray-200 rounded-lg">Explore Products</Link>
          </div>

          <div className="text-sm text-gray-500">No account? You can try demos or explore features without logging in.</div>
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">{t('productsHeading')}</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {products.map(p => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
