export function Footer() {
    return (
        <footer className="main-footer">
            <div className="footer-content">

                <div style={{ textAlign: 'center' }}>
                    <h4 className="footer-title">Capital Flow</h4>
                    <p>La experiencia definitiva del festival.</p>
                </div>

                <div className="footer-links">
                    <a href="#" className="footer-link">Aviso de Privacidad</a>
                    <a href="#" className="footer-link">Términos y Condiciones</a>
                    <a href="#" className="footer-link">Soporte</a>
                </div>

                <p style={{ opacity: 0.5, fontSize: '0.8rem' }}>© 2026 Capital Flow Inc.</p>
            </div>
        </footer>
    );
}
