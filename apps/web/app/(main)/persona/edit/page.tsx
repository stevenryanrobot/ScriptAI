import { PersonaWizard } from '@/components/persona/PersonaWizard'

export default function PersonaEditPage() {
  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">编辑人设</h1>
        <p className="text-sm text-gray-500 mt-1">修改你的创作者人设信息</p>
      </div>
      <PersonaWizard />
    </div>
  )
}
