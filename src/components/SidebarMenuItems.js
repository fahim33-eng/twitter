export default function SidebarMenuItems({ text, Icon, active }) {
  return (
    <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start space-x-3">
      <Icon />
      <span className={`${active && "font-bold"} hidden xl:inline`}>{text}</span>
    </div>
  )
}
