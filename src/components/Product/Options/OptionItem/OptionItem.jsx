function OptionItem({ icon, title, children, onClick }) {
  return (
    <span
      className='hover:bg-[#2a2a2a] hover:text-white hover:border-none transition-colors duration-300 ease-in-out cursor-pointer flex justify-center items-center rounded-full w-10 h-10 bg-white shadow-md'
      title={title}
      onClick={onClick}
    >
      {icon}
      {children}
    </span>
  )
}

export default OptionItem
