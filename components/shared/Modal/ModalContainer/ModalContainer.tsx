import { ModalProps } from './types';
import { useModalContainer } from './useModalContainer';

const ModalContainer = ({
  children,
  selectRef = null,
  closeRef = null,
  closeOnClick = false,
  modalOpenOnload = false,
  modalControl,
}: ModalProps) => {
  const { dropdown, ref, onClickOutside } = useModalContainer({
    selectRef,
    closeRef,
    modalOpenOnload,
    modalControl,
  });

  return (
    <>
      {children && dropdown ? (
        <div
          className='z-10'
          ref={ref}
          onClick={() => closeOnClick && onClickOutside()}
        >
          {children}
        </div>
      ) : null}
    </>
  );
};

export default ModalContainer;