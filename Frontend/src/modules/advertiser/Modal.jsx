import React from "react";
import { IcClose } from "../../assets/icons.jsx";

/* ---------------------------------------------------------------------- */
/*  Reusable modal shell                                                   */
/* ---------------------------------------------------------------------- */
export default function Modal({ title, onClose, children, width = 480 }) {
  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel" style={{ maxWidth: width }}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button type="button" className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close">
            <IcClose size={16} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
