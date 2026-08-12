/**
 * Shown where policy cards would be when someone holds no UOI product.
 *
 * The header and category chips stay in place above it — only the card list
 * is replaced, so the page still reads as "your coverage, which is empty"
 * rather than a different screen.
 */
/** Same wording on the dashboard and the policies tab — kept here so it cannot drift. */
const DESCRIPTION =
  'We could not find any UOI policies linked to your NRIC/FIN. If you recently bought a policy it may take a few days to appear here.'

export default function EmptyCoverage({
  action,
}: {
  action?: { label: string; onClick?: () => void }
}) {
  return (
    <div className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] min-h-[280px] px-[24px] py-[48px] sm:px-[48px] flex flex-col items-center justify-center gap-[24px] w-full">
      <div className="flex flex-col items-center justify-center gap-[8px] text-center w-full">
        <p className="text-[16px] font-medium leading-[1.5] text-[#212121] m-0">
          No active coverage yet
        </p>
        <p className="text-[14px] leading-[1.5] text-[#6e6e6e] m-0 max-w-[620px]">
          {DESCRIPTION}
        </p>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="rounded-[8px] px-[24px] py-[12px] text-[16px] font-medium leading-[1.5] bg-[#005eb8] text-white border-0 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] cursor-pointer whitespace-nowrap"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
