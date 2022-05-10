import { Modal as BsModal } from 'bootstrap';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { getRootElement } from '../..';
import useUniqueId from '../../utils/UniqueID';

export type ModalProps = {
  show: boolean;
  closeOnSave?: boolean;
  onClose?: VoidFunction;
  onSave?: () => void | boolean;
  header?: {
    show?: boolean,
    title?: string,
    closeButton?: boolean,
  };
  footer?: {
    show?: boolean,
    closeButton?: boolean,
    closeButtonText?: string,
    saveButton?: boolean,
    saveButtonText?: string,
  }
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  show,
  closeOnSave = false,
  onClose = () => { },
  onSave = () => true,
  header = {
    show: true,
    title: 'Модальное окно',
    closeButton: true,
  },
  footer = {
    show: true,
    closeButton: true,
    closeButtonText: 'Закрыть',
    saveButton: true,
    saveButtonText: 'Сохранить изменения'
  },
  children
}) => {
  const [id] = useState(useUniqueId('modal-'));
  const [modal, setModal] = useState<BsModal>();
  const [canSave, setCanSave] = useState(false);

  const onModalShow = () => setCanSave(true);
  const onModalHide = () => {
    setCanSave(false);
    onClose();
  };

  useEffect(() => {
    const modalElement = document.getElementById(id) as HTMLElement;
    modalElement.addEventListener('show.bs.modal', onModalShow)
    modalElement.addEventListener('hide.bs.modal', onModalHide)

    const modalComponent = new BsModal(modalElement, {
      focus: true,
    });

    setModal(modalComponent);

    return () => {
      modalElement.removeEventListener('show.bs.modal', onModalShow);
      modalElement.removeEventListener('hide.bs.modal', onModalHide);
      modal?.dispose();
    }
  }, [])

  useMemo(() => {
    if (show) {
      modal?.show();
    } else {
      modal?.hide();
    }
  }, [show])

  const saveHandle = () => {
    const hasNoErrors = onSave();

    if (hasNoErrors !== false && closeOnSave) {
      modal?.hide();
    }
  }

  return ReactDOM.createPortal((
    <div className="modal fade" id={id} tabIndex={-1}>
      <div className="modal-dialog modal-fullscreen-sm-down ">
        <div className="modal-content">
          {(header.show !== false) && (
            <div className="modal-header">
              <h5 className="modal-title">{header.title}</h5>
              {(header.closeButton !== false) && (
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              )}
            </div>
          )}
          <div className="modal-body">
            {children}
          </div>
          {(footer.show !== false) && (
            <div className="modal-footer">
              {(footer.closeButton !== false) && (
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  {footer.closeButtonText}
                </button>
              )}
              {(footer.saveButton !== false) && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveHandle}
                  disabled={!canSave}
                >
                  {footer.saveButtonText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ), getRootElement());
};

export default Modal;
