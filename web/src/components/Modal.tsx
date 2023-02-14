interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  header?: string;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, header, onClose }: ModalProps) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white rounded-md p-4 w-1/2 text-black">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">{header}</h1>
            </div>
            <div>
              <button
                className="text-black text-2xl font-bold"
                onClick={() => onClose()}
              >
                &times;
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
