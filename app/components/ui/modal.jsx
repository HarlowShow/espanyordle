export default function Modal({ handleClose, children}) {
    return (
        <div>
            <section className="modal-main">
                    { children }
                <button type="button" onClick={handleClose}>
                    Close
                </button>
            </section>
        </div>
    )
}