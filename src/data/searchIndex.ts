import { POLICIES } from './policies'
import { TOPICS, type HelpTopicKey } from './helpTopics'

export type SearchResult =
  | { id: string; kind: 'policy'; badge: string; title: string; matchText: string; slug?: string }
  | { id: string; kind: 'help'; badge: string; title: string; subtitle: string; matchText: string; topic: HelpTopicKey }

const POLICY_RESULTS: SearchResult[] = POLICIES.map(p => ({
  id: `policy-${p.id}`,
  kind: 'policy',
  badge: 'Policy',
  title: `${p.name} ${p.policyNo}`,
  matchText: `${p.name} ${p.policyNo} ${p.category}`,
  slug: p.detailSlug,
}))

const HELP_RESULTS: SearchResult[] = (Object.entries(TOPICS) as [HelpTopicKey, typeof TOPICS[HelpTopicKey]][]).flatMap(
  ([topicKey, topic]) =>
    topic.faqs.map((faq, i) => ({
      id: `help-${topicKey}-${i}`,
      kind: 'help' as const,
      badge: 'Help & Support',
      title: faq.question,
      subtitle: topic.breadcrumbLabel,
      matchText: `${faq.question} ${topic.breadcrumbLabel}`,
      topic: topicKey,
    }))
)

export const SEARCH_INDEX: SearchResult[] = [...POLICY_RESULTS, ...HELP_RESULTS]

export function searchIndex(query: string): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return SEARCH_INDEX.filter(r => r.matchText.toLowerCase().includes(q))
}
