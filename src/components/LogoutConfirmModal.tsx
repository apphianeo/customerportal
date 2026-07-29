import closeIcon from '../assets/icons/close.svg'

/** Confirmation shown before signing the user out. */
export default function LogoutConfirmModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-[24px] w-[600px] max-w-full flex flex-col gap-[24px]"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
      >
        <div className="flex flex-col gap-[12px] w-full">
          <div className="flex gap-[8px] items-start w-full">
            <h2
              id="logout-title"
              className="flex-1 min-w-0 text-[20px] font-semibold leading-[1.2] text-[#212121] m-0"
            >
              Are you sure you want to log out?
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 bg-transparent border-0 p-0 cursor-pointer"
            >
              <img src={closeIcon} alt="" className="w-[20px] h-[20px]" />
            </button>
          </div>
          <p className="text-[16px] leading-[1.5] text-[#212121] m-0">
            You will be logged out on all active devices
          </p>
        </div>

        <div className="flex gap-[16px] items-center justify-end w-full">
          <button
            onClick={onConfirm}
            className="bg-[#dc2626] text-white px-[24px] py-[12px] rounded-[8px] text-[16px] font-medium leading-[1.5] border-0 cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}
