import React from 'react'
import Theme from './ui/Theme'
import { exportToPDF } from '../utils/pdf';

export default function Header({ target }) {
    const handleDownload = () => {
        exportToPDF(target.current);
    }
    return (
        <div className="header">
            <div>
                <h2>
                    🇺🇿 Uzbekistan Population
                </h2>
                <p>
                    Population Dynamics • 1991–2026
                </p>
            </div>
            <div className="btns">
                <button className="pdf_btn" onClick={handleDownload}>
                    PDF Yuklab olish
                </button>
                <Theme></Theme>
            </div>
        </div>
    )
}
