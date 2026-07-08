import { RightOutlined } from '@ant-design/icons'
import { searchIndex, type SearchResult } from '../data/searchIndex'
import type { HelpTopicKey } from '../data/helpTopics'

/* ─── Bold the portion of `text` matching `query` ────────── */
function HighlightMatch({ text, query }: { text: string; query: string }) {
  const idx = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="font-semibold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

function ResultCard({ result, query, onClick }: { result: SearchResult; query: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:shadow-pop transition-shadow px-[16px] py-[24px] flex items-center gap-[16px] w-full cursor-pointer border-0 text-left"
    >
      <div className="flex-1 min-w-0 flex flex-col gap-[12px]">
        <span className="inline-flex items-center px-[8px] py-[4px] rounded-[24px] bg-[#f5f5f5] text-[#6e6e6e] text-xs font-medium w-fit">
          {result.badge}
        </span>
        <div className="flex flex-col gap-[8px]">
          <p className="text-[16px] font-medium text-[#212121] m-0">
            <HighlightMatch text={result.title} query={query} />
          </p>
          {result.kind === 'help' && (
            <p className="text-[14px] text-[#6e6e6e] m-0">{result.subtitle}</p>
          )}
        </div>
      </div>
      <RightOutlined className="shrink-0" style={{ fontSize: 20, color: '#6E6E6E' }} />
    </button>
  )
}

type Props = {
  query: string
  onNavigateToDashboard?: () => void
  onSelectPolicy?: (slug: string) => void
  onSelectHelpTopic?: (topic: HelpTopicKey) => void
}

export default function SearchResultsPage({ query, onNavigateToDashboard, onSelectPolicy, onSelectHelpTopic }: Props) {
  const results = searchIndex(query)

  function handleSelect(result: SearchResult) {
    if (result.kind === 'policy') {
      if (result.slug) onSelectPolicy?.(result.slug)
      else console.log('View policy', result.id)
    } else {
      onSelectHelpTopic?.(result.topic)
    }
  }

  return (
    <div className="bg-bg-page min-h-full">
      <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-[32px]">

        {/* Breadcrumb */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-[4px] flex-wrap">
            <button onClick={onNavigateToDashboard} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer hover:text-[#6e6e6e] transition-colors">
              Dashboard
            </button>
            <RightOutlined style={{ fontSize: 10, color: '#6E6E6E' }} />
            <span className="text-[12px] font-bold text-[#005eb8] leading-[1.4]">Search Results</span>
          </div>
          <h1 className="text-[28px] sm:text-[32px] leading-[1.2] m-0">
            <span className="font-normal text-[#212121]">Results for </span>
            <span className="font-semibold text-[#212121]">&ldquo;{query}&rdquo;</span>
          </h1>
          <p className="text-[14px] font-medium text-[#6e6e6e] m-0">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </p>
        </div>

        {results.length === 0 ? (
          <p className="text-[14px] text-[#212121] m-0">
            Sorry we didn't find anything! Try being more specific or using different keywords.
          </p>
        ) : (
          <div className="flex flex-col gap-[16px] w-full">
            {results.map(result => (
              <ResultCard key={result.id} result={result} query={query} onClick={() => handleSelect(result)} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
