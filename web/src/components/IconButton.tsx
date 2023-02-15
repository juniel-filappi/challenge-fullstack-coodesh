interface IconButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  dataCy?: string;
  className?: string;
}

export function IconButton({
  children,
  onClick,
  className,
  dataCy,
}: IconButtonProps) {
  return (
    <button
      className={`text-xl hover:bg-blue-500 transition-all duration-200 rounded-full p-2 ${className}`}
      data-cy={dataCy}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
